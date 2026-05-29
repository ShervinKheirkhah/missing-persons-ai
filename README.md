
# 🔍 FindMe - Missing Persons AI System 
A modern, web-based system designed to help reunite missing persons with their families using advanced AI face recognition and hybrid metadata filtering.

![Arch Linux](https://img.shields.io/badge/OS-Arch%20Linux-1793D1?logo=arch-linux)
![Python](https://img.shields.io/badge/Python-3.11-3776AB?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?logo=fastapi)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react)

---

## 🌟 Features

- **AI Face Recognition:** Upload a photo, and the system uses DeepFace (VGG-Face model) to scan the database for facial matches.
- **Hybrid Search:** Combine AI face matching with traditional filters (Age, Height, National ID, Location) for precise results.
- **Contact and Location Info:** Provides clear contact details and last seen locations to help families reconnect quickly.
- **Dark UI and Glassmorphism:** Beautiful, responsive RTL (Persian) interface with animated backgrounds and glass-effect components.
- **Fast and Lightweight:** Built with FastAPI for high-performance backend operations.

---

## 🛠️ Tech Stack

**Backend:**
- Python 3.11
- FastAPI
- SQLAlchemy (SQLite)
- DeepFace (VGG-Face)

**Frontend:**
- React (Vite)
- Axios
- CSS3 (Animations, Grid, Glassmorphism)

---

## 🤖 AI Tools and Models Disclosure

In the development of this project, Artificial Intelligence was utilized in two distinct ways:

1. **Core System Feature (Machine Learning):** 
   The face recognition engine is powered by **DeepFace**, specifically utilizing the **VGG-Face** model architecture for facial embedding and similarity matching.

2. **Development Assistance (Generative AI):** 
   **Claude 3.5 Sonnet** (by Anthropic) and **GPT-4o** (by OpenAI) were used as pair-programming assistants for code generation, debugging, architectural design, and writing project documentation.

---

## 🚀 How to Run Locally

### Prerequisites

- Python 3.11+ (Highly recommended to use Conda or venv due to TensorFlow dependencies)
- Node.js and npm

### 1. Backend Setup

Open a terminal and run the following commands:

```bash
cd backend
python -m venv venv --without-pip
source venv/bin/activate
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python get-pip.py
rm get-pip.py

pip install -r requirements.txt
TF_CPP_MIN_LOG_LEVEL=3 uvicorn main:app --reload
```
The backend will run on `http://127.0.0.1:8000`

### 2. Frontend Setup

Open a new terminal and run the following commands:

```bash
cd frontend
npm install
npm run dev
```
The frontend will run on `http://localhost:5173`

---

## 📁 Project Structure

```text
missing-persons-system/
├── backend/
│   ├── main.py            # FastAPI application and AI logic
│   ├── requirements.txt   # Python dependencies
│   └── images/            # Stored faces (Gitignored)
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Main React component
│   │   └── App.css        # Styles and animations
│   └── package.json
├── .gitignore
└── README.md
```

---

## 📜 License

This project is open-source and available under the MIT License.

---
Built with ❤️ to help communities.
