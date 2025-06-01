from fastapi import APIRouter, Depends, HTTPException
from models import NoteCreate
from db import db
from auth import get_current_user
from datetime import datetime, timezone
from bson import ObjectId
from pydantic import BaseModel

from pydantic import BaseModel

class UpdateNoteTitle(BaseModel):
    note_id: str
    new_title: str

router = APIRouter()

@router.post("/notes")
async def save_note(note: NoteCreate, user_email: str = Depends(get_current_user)):
    if not note.content.strip():
        raise HTTPException(status_code=400, detail="Note content is empty")

    note_data = {
        "note_id": str(ObjectId()),  # Generate a unique ID for the note
        "timestamp": datetime.now(timezone.utc),
        "content": note.content,
        "title": note.title or "Untitled"

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

@router.delete("/notes/{note_id}")
async def delete_note(note_id: str, user_email: str = Depends(get_current_user)):
    result = await db["users"].update_one(
        {"email": user_email},
        {"$pull": {"notes": {"note_id": note_id}}}
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Note not found")

    return {"message": "Note deleted"}

@router.patch("/notes/update-title")
async def update_note_title(data: UpdateNoteTitle, user=Depends(get_current_user)):
    note = await db["notes"].find_one({"_id": ObjectId(data.note_id), "user_id": user["email"]})
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")

    await db["notes"].update_one(
        {"_id": ObjectId(data.note_id)},
        {"$set": {"title": data.new_title}}
    )
    return {"message": "Title updated"}

