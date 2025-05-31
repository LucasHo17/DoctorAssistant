from jose import jwt, JWTError
from datetime import datetime, timedelta, timezone
import bcrypt
from dotenv import load_dotenv
from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import os

auth_scheme = HTTPBearer()

SECRET_KEY = "supersecretkey"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

load_dotenv()
SECRET_KEY = os.getenv("JWT_SECRET_KEY", SECRET_KEY)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
    
async def get_current_user(token: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    payload = decode_access_token(token.credentials)
    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return payload["sub"] 

def hash_password(password: str)->str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode()
def verify_password(password:str, hashed_password:str)->bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode())           