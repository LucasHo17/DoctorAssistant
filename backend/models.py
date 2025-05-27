from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class Note(BaseModel):
    timestamp: datetime
    content: str
    title: Optional[str] = None

class NoteCreate(BaseModel):
    content: str
    title: Optional[str] = None

#Signup
class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str

#Login
class UserLogin(BaseModel):
    email: EmailStr
    password: str

#User
class UserInDB(BaseModel):
    email: EmailStr
    username: str
    password_hash: str
    notes: List[Note] = []