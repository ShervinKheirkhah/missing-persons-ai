from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker
from deepface import DeepFace
import shutil
import os

# --- Database Configuration ---
SQLALCHEMY_DATABASE_URL = "sqlite:///./missing_persons.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# --- Database Model (Added contact_info) ---
class Person(Base):
    __tablename__ = "persons"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    status = Column(String) # "missing" or "found"
    description = Column(String)
    image_path = Column(String)
    age = Column(Integer, nullable=True)
    height = Column(String, nullable=True)
    national_code = Column(String, nullable=True)
    last_location = Column(String, nullable=True)
    contact_info = Column(String, nullable=True) # NEW: Contact info for found persons

Base.metadata.create_all(bind=engine)

# --- FastAPI Setup ---
app = FastAPI(title="Missing Persons AI System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs("images", exist_ok=True)

@app.get("/")
def read_root():
    return {"message": "Missing Persons AI System is running successfully!"}

# --- Registration Endpoint ---
@app.post("/register/")
async def register_person(
    name: str = Form(...), 
    status: str = Form(...), 
    description: str = Form(...), 
    age: int = Form(None),
    height: str = Form(None),
    national_code: str = Form(None),
    last_location: str = Form(None),
    contact_info: str = Form(None), # NEW
    image: UploadFile = File(...)
):
    file_location = f"images/{image.filename}"
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    db = SessionLocal()
    db_person = Person(
        name=name, 
        status=status, 
        description=description, 
        image_path=file_location,
        age=age,
        height=height,
        national_code=national_code,
        last_location=last_location,
        contact_info=contact_info # NEW
    )
    db.add(db_person)
    db.commit()
    db.refresh(db_person)
    db.close()
    
    return {"id": db_person.id, "name": name, "message": "Person registered successfully!"}

# --- Hybrid Search Endpoint ---
@app.post("/match-person/")
async def match_person(
    image: UploadFile = File(...),
    age: int = Form(None),
    height: str = Form(None),
    national_code: str = Form(None),
    last_location: str = Form(None)
):
    temp_path = f"images/temp_search_{image.filename}"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    try:
        dfs = DeepFace.find(img_path=temp_path, db_path="images", model_name="VGG-Face", enforce_detection=False)
        
        if len(dfs) > 0 and not dfs[0].empty:
            matches = dfs[0]
            matched_paths = matches['identity'].tolist()
            
            db = SessionLocal()
            query = db.query(Person).filter(Person.image_path.in_(matched_paths))
            
            if age is not None:
                query = query.filter(Person.age == age)
            if height is not None:
                query = query.filter(Person.height == height)
            if national_code is not None:
                query = query.filter(Person.national_code == national_code)
            if last_location is not None:
                query = query.filter(Person.last_location.contains(last_location))
                
            filtered_persons = query.all()
            
            results = []
            for person in filtered_persons:
                results.append({
                    "id": person.id,
                    "name": person.name,
                    "status": person.status,
                    "description": person.description,
                    "age": person.age,
                    "height": person.height,
                    "national_code": person.national_code,
                    "last_location": person.last_location,
                    "contact_info": person.contact_info, # NEW
                    "image_path": person.image_path
                })
            db.close()
            os.remove(temp_path)
            
            return {"matches": results, "message": f"{len(results)} matching person(s) found with the given criteria!"}
        else:
            os.remove(temp_path)
            return {"matches": [], "message": "No matching person found in the database."}

    except Exception as e:
        if os.path.exists(temp_path):
            os.remove(temp_path)
        raise HTTPException(status_code=500, detail=f"AI Error: {str(e)}")

# --- Mount static files MUST BE AT THE END ---
app.mount("/images", StaticFiles(directory="images"), name="images")
