# Doctor Assistant – AI-Powered Virtual Healthcare Assistant (2025)

**Tech Stack:** React, FastAPI, MongoDB, OpenAI (GPT-4o + TTS), JWT, Web Speech API, Cloudinary, Docker  
**GitHub:** [github.com/LucasHo17/DoctorAssistant](https://github.com/LucasHo17/DoctorAssistant)

---

## Project Overview
Doctor Assistant is an AI-powered virtual healthcare platform that allows users to **interact with a virtual doctor**, receive personalized medical advice, and manage personal health notes. The platform combines natural language AI, realistic voice responses, and a responsive web interface to create an engaging telehealth experience.

---

## Key Features
- **AI-Powered Consultation:** Integrated **GPT-4o** for natural conversation and **OpenAI TTS** for real-time voice responses.  
- **Interactive 2D Doctor Avatar:** Speech-synchronized CSS lip-sync improves consultation realism.  
- **Secure User Authentication:** JWT-based login ensures account safety and data privacy.  
- **Responsive UI & Animations:** Built with **React** and **Framer Motion** for smooth, modern interactions.  
- **Containerized Deployment:** Backend and frontend packaged with **Docker** for reproducible builds and simplified deployment.

---

## How to Run Locally
```bash
# Clone the repository
git clone https://github.com/LucasHo17/DoctorAssistant.git
cd DoctorAssistant

# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies
cd ../backend && pip install -r requirements.txt

# Run backend and frontend
docker-compose up






