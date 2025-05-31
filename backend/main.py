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
    allow_origins=origins,  # Adjust to your frontend's port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(notes.router)
app.include_router(ai.router)  