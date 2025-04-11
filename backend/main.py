from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from models.chat_model import UserQuery, LLMResponse
from services.orchestrator import abot
import os
from dotenv import load_dotenv

# If main.py is in the same folder as .env, this is sufficient:

import os

app = FastAPI()
load_dotenv()
# add middlesware for CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat", response_model=LLMResponse)
async def chat_endpoint(req: UserQuery):
    """
    Endpoint for chat messages.
    """
    initial_state = {"messages": [{"role": "user", "content": req.query}]}
    print("Initial State:", initial_state)
    result = abot.graph.invoke(initial_state)
    
    bot_message = result["messages"][-1]
    response_text = getattr(bot_message, "content", None)
    print("Bot Message: \n", LLMResponse(response=response_text))
    if response_text is None:
        raise HTTPException(status_code=500, detail="No response from the bot")
    return LLMResponse(response=response_text)
    

