# MediSync AI – AI-Powered Virtual Healthcare Assistant

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/LucasHo17/DoctorAssistant)
[![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20FastAPI%20%7C%20MongoDB-green)](https://github.com/LucasHo17/DoctorAssistant)

**Tech Stack:** React, FastAPI, MongoDB, OpenAI (GPT-4o + TTS), JWT, Web Speech API, Cloudinary, Docker

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Environment Variables](#environment-variables)
  - [Local Development](#local-development)
  - [Docker Deployment](#docker-deployment)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Project Overview

MediSync AI is an AI-powered virtual healthcare platform that enables users to interact with a virtual doctor, receive personalized medical advice, and manage personal health notes. The platform combines natural language AI, realistic voice responses, and a responsive web interface to create an engaging telehealth experience.

---

## ✨ Key Features

- **🤖 AI-Powered Consultation:** Integrated **GPT-4o** for natural conversation and **OpenAI TTS** for real-time voice responses
- **👨‍⚕️ Interactive 2D Doctor Avatar:** Speech-synchronized CSS lip-sync for enhanced consultation realism
- **🔐 Secure User Authentication:** JWT-based authentication ensures account safety and data privacy
- **📝 Health Notes Management:** Create, edit, and organize personal health notes with ease
- **🎤 Voice Interaction:** Web Speech API integration for hands-free consultation
- **📱 Responsive UI & Animations:** Built with **React** and **Framer Motion** for smooth, modern interactions
- **🐳 Containerized Deployment:** Backend and frontend packaged with **Docker** for reproducible builds and simplified deployment

---

## 🛠 Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Web Speech API** - Voice recognition
- **Cloudinary** - Image management

### Backend
- **FastAPI** - Modern Python web framework
- **MongoDB** (Motor) - Async database driver
- **OpenAI API** - GPT-4o and TTS integration
- **JWT** - Authentication tokens
- **Uvicorn** - ASGI server

### DevOps
- **Docker** & **Docker Compose** - Containerization
- **Nginx** - Reverse proxy and static file serving

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) and **npm**
- **Python** (v3.12 or higher) and **pip**
- **Docker** and **Docker Compose** (for containerized deployment)
- **MongoDB** database (local or cloud instance like MongoDB Atlas)
- **OpenAI API Key** (for GPT-4o and TTS functionality)

---

## 🚀 Getting Started

### Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
MONGO_URI=mongodb://localhost:27017/doctor_app
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/doctor_app

OPENAI_API_KEY=your_openai_api_key_here
JWT_SECRET_KEY=your_jwt_secret_key_here
DID_API_KEY=your_did_api_key_here  # Optional, if using D-ID for avatar
```

**Note:** Generate a secure JWT secret key (e.g., using `openssl rand -hex 32`)

### Local Development

#### Option 1: Run with Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/LucasHo17/DoctorAssistant.git
cd DoctorAssistant

# Ensure backend/.env file is configured (see Environment Variables above)

# Build and run with Docker Compose
docker-compose up --build

# The application will be available at:
# Frontend: http://localhost
# Backend API: http://localhost:8000
```

#### Option 2: Run Locally (Without Docker)

**Backend Setup:**
```bash
cd backend

# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Ensure .env file is configured
# Run the server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Frontend Setup:**
```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev

# The frontend will be available at http://localhost:5173
```

### Docker Deployment

The project includes Docker configurations for both frontend and backend:

- **Backend:** Exposed on port `8000`
- **Frontend:** Served via Nginx on port `80`

To stop the containers:
```bash
docker-compose down
```

To view logs:
```bash
docker-compose logs -f
```

---

## 📁 Project Structure

```
DoctorAssistant/
├── backend/
│   ├── routes/          # API route handlers
│   │   ├── users.py     # User authentication endpoints
│   │   ├── notes.py     # Health notes endpoints
│   │   └── ai.py        # AI consultation endpoints
│   ├── main.py          # FastAPI application entry point
│   ├── auth.py          # JWT authentication utilities
│   ├── db.py            # MongoDB connection
│   ├── models.py        # Data models
│   ├── requirements.txt # Python dependencies
│   ├── Dockerfile       # Backend container configuration
│   └── .env            # Environment variables (create this)
│
├── frontend/
│   ├── src/
│   │   ├── api/         # API client functions
│   │   ├── pages/       # React page components
│   │   ├── App.jsx      # Main app component
│   │   └── main.jsx     # React entry point
│   ├── public/          # Static assets
│   ├── package.json     # Node dependencies
│   ├── Dockerfile       # Frontend container configuration
│   └── nginx.conf       # Nginx configuration
│
└── docker-compose.yml   # Multi-container orchestration
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/me` - Get current user (protected)

### Health Notes
- `GET /api/notes` - Get all user notes (protected)
- `POST /api/notes` - Create a new note (protected)
- `PUT /api/notes/{note_id}` - Update a note (protected)
- `DELETE /api/notes/{note_id}` - Delete a note (protected)

### AI Consultation
- `POST /api/ai/ask` - Chat with AI doctor (protected)
- `POST /api/ai/voice` - Get voice response from AI (protected)

**Note:** All protected endpoints require a JWT token in the `Authorization` header: `Bearer <token>`

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🔗 Links

- **GitHub Repository:** [github.com/LucasHo17/DoctorAssistant](https://github.com/LucasHo17/DoctorAssistant)
- **Issues:** [Report a bug or request a feature](https://github.com/LucasHo17/DoctorAssistant/issues)

---

**Built with ❤️ using React, FastAPI, and OpenAI**








