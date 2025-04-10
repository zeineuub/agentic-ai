from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models.chat_model import UserQuery, LLMResponse
from services.orchestrator import abot
from langchain.schema import AIMessage, HumanMessage
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat", response_model=LLMResponse)
def chat_endpoint(req: UserQuery):
    """
    Endpoint for handling chat messages.
    """
    try:
        print("\n🟢 Received Query:", req.query)

        # Initialize state
        initial_state = {"messages": [HumanMessage(content=req.query)]}

        # Invoke the LangGraph pipeline
        result = abot.graph.invoke(initial_state)
        print("\n🔵 Graph Execution Result:", result)

        # Ensure the result contains messages
        messages = result.get("messages", [])
        if not messages:
            raise ValueError("Agent returned no messages")

        # Get the last AI response message
        last_message = next((msg.content for msg in reversed(messages) if isinstance(msg, AIMessage)), "")

        return LLMResponse(
            response=last_message,  # Only the latest AI response
        )

    except Exception as e:
        print("\n❌ Error:", str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")
