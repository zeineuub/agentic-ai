from fastapi import APIRouter
from app.models.chat_model import LLMResponse, UserQuery


router = APIRouter()

@router.post("/chat", response_model=LLMResponse)
async def chat(request: UserQuery):
    """Handles user chat messages and returns an AI response."""
    print("Received request:", request)
    response_text = "hello there"
    return LLMResponse(response=response_text)
