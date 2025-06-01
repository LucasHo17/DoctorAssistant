from fastapi import FastAPI
from routes import users, notes, ai
from fastapi.middleware.cors import CORSMiddleware

app =  FastAPI()

origins = [
    "http://localhost:3000",   # CRA default, if you use it
    "http://localhost:5173",   # Vite default
    "http://localhost:5174",   # if you start Vite on 5174
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://doctorassistant-frontend-zidw.onrender.com"],  # Adjust to your frontend's port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(notes.router)
app.include_router(ai.router)  

if __name__ == "__main__":
    import uvicorn
    import os
    port = int(os.environ.get("PORT", 8000))  # fallback for local
    uvicorn.run("main:app", host="0.0.0.0", port=port)