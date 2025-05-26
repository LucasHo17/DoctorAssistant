from fastapi import APIRouter, Depends, HTTPException
from models import NoteCreate, Note
from db import db
from auth import get_current_user
from datetime import datetime, timezone

router = APIRouter()

@router.post("/notes")
async def save_note(note: NoteCreate, user_email: str = Depends(get_current_user)):
    if not note.content.strip():
        raise HTTPException(status_code=400, detail="Note content is empty")

    note_data = {
        "timestamp": datetime.now(timezone.utc),
        "content": note.content
    }

    result = await db["users"].update_one(
        {"email": user_email},
        {"$push": {"notes": note_data}}
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="User not found")

    return {"message": "Note saved"}

@router.get("/notes")
async def get_notes(user_email: str = Depends(get_current_user)):
    user = await db["users"].find_one({"email": user_email})

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {"notes": user.get("notes", [])}

