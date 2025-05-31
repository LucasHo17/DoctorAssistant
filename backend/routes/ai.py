from fastapi import APIRouter, HTTPException
from openai import OpenAI
import os
from fastapi.responses import StreamingResponse
import io
from pydantic import BaseModel
from typing import List, Dict
import requests


class PromptInput(BaseModel):
    prompt: str

class ChatHistory(BaseModel):
    messages: list[dict]


router = APIRouter()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
DID_API_KEY = os.getenv("DID_API_KEY")  # from your .env


@router.post("/ask-doctor")
async def ask_doctor(input: ChatHistory):
    try:
        response = client.chat.completions.create(
            model="chatgpt-4o-latest",
            messages=input.messages,
            temperature=0.1,
            max_tokens=300,
        )
        reply = response.choices[0].message.content
        return {"reply": reply}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post("/doctor-voice")
async def doctor_voice(input: PromptInput):
    try:
        response = client.audio.speech.create(
            model="tts-1-hd",
            voice="nova",
            input=input.prompt
        )
        audio_data = response.content
        return StreamingResponse(io.BytesIO(audio_data), media_type="audio/mpeg")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    