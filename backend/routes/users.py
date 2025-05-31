from fastapi import APIRouter, HTTPException
from models import UserCreate, UserInDB, UserLogin
from db import db
from auth import hash_password, verify_password, create_access_token
from pymongo.errors import DuplicateKeyError

router = APIRouter()

@router.post("/signup")
async def signup(user: UserCreate):
    users_collection = db["users"]

    # Check if email already exists
    existing = await users_collection.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    user_data = UserInDB(
        email=user.email,
        username=user.username,
        password_hash=hash_password(user.password),
        notes=[]
    ).model_dump()

    try:
        await users_collection.insert_one(user_data)
        return {"message": "Signup successful"}
    except DuplicateKeyError:
        raise HTTPException(status_code=400, detail="User already exists")
    
@router.post("/login")
async def login(user: UserLogin):
    users_collection = db["users"]
    db_user = await users_collection.find_one({"email": user.email})

    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    if not verify_password(user.password, db_user["password_hash"]):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    token = create_access_token({
        "sub": db_user["email"],
        "username": db_user["username"]  # ✅ include it here
})

    return {
        "access_token": token,
        "token_type": "bearer",
        "username": db_user.get("username", "")
    }
