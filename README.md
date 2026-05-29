🔍 FindMe - Missing Persons AI System (جستجوگر هوشمند افراد گمشده)

A modern, web-based system designed to help reunite missing persons with their families using advanced AI face recognition and hybrid metadata filtering.

Arch LinuxPythonFastAPIReact
🌟 Features

    AI Face Recognition: Upload a photo, and the system uses DeepFace (VGG-Face model) to scan the database for facial matches.
    Hybrid Search: Combine AI face matching with traditional filters (Age, Height, National ID, Location) for precise results.
    Contact & Location Info: Provides clear contact details and last seen locations to help families reconnect quickly.
    Dark UI & Glassmorphism: Beautiful, responsive RTL (Persian) interface with animated backgrounds and glass-effect components.
    Fast & Lightweight: Built with FastAPI for high-performance backend operations.

🛠️ Tech Stack

Backend:

    Python 3.11
    FastAPI
    SQLAlchemy (SQLite)
    DeepFace (VGG-Face)

Frontend:

    React (Vite)
    Axios
    CSS3 (Animations, Grid, Glassmorphism)

🤖 AI Tools & Models Disclosure

In the development of this project, Artificial Intelligence was utilized in two distinct ways:

    Core System Feature (Machine Learning): 
        The face recognition engine is powered by DeepFace, specifically utilizing the VGG-Face model architecture for facial embedding and similarity matching.
    Development Assistance (Generative AI): 
        Claude 3.5 Sonnet (by Anthropic) and GPT-4o (by OpenAI) were used as pair-programming assistants for code generation, debugging, architectural design, and writing project documentation.

🚀 How to Run Locally
Prerequisites

    Python 3.11+ (Highly recommended to use Conda or venv due to TensorFlow dependencies)
    Node.js & npm

1. Backend Setup

cd backendpython -m venv venv --without-pipsource venv/bin/activatecurl https://bootstrap.pypa.io/get-pip.py -o get-pip.pypython get-pip.pyrm get-pip.pypip install -r requirements.txtTF_CPP_MIN_LOG_LEVEL=3 uvicorn main:app --reload

The backend will run on http://127.0.0.1:8000
2. Frontend Setup

Open a new terminal:
bash
 
  
 
 
cd frontend
npm install
npm run dev
 
 

The frontend will run on http://localhost:5173
📁 Project Structure

missing-persons-system/
├── backend/
│   ├── main.py            # FastAPI application & AI logic
│   ├── requirements.txt   # Python dependencies
│   └── images/            # Stored faces (Gitignored)
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Main React component
│   │   └── App.css        # Styles & animations
│   └── package.json
├── .gitignore
└── README.md
 
 
📜 License

This project is open-source and available under the MIT License.

Built with ❤️ to help communities.
