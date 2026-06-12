from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional, Dict

class MessageCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=5, max_length=2000)

class MessageResponse(BaseModel):
    id: str = Field(..., alias="_id")
    name: str
    email: str
    message: str
    created_at: str

class ChatMessage(BaseModel):
    sender: str  # "user" or "ai"
    text: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = None

class AdminLogin(BaseModel):
    token: str

class StatUpdate(BaseModel):
    key: str  # "views" or "stars"
