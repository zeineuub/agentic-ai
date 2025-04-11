
from langgraph.graph import StateGraph, END
from langchain_huggingface import ChatHuggingFace, HuggingFaceEndpoint
from langchain_core.prompts import PromptTemplate
from langchain_community.tools.tavily_search import TavilySearchResults
from pydantic import BaseModel, Field  
from typing import Annotated, Optional, TypedDict, Sequence
from dotenv import load_dotenv
import operator

from langchain_core.messages import AnyMessage, SystemMessage, ToolMessage

import os

load_dotenv()
# Define the state graph structure for the agent.
class AgentState(TypedDict):
    """State model for the StateGraph."""
    messages: Annotated[list[AnyMessage], operator.add]

# Define the prompt (system message).
prompt = (
    "You are a smart research assistant. Use the search engine to look up information. "
    "You are allowed to make multiple calls (either together or in sequence). "
    "Only look up information when you are sure of what you want. "
    "If you need to look up some information before asking a follow up question, you are allowed to do that!"
)

class Agent:
    def __init__(self, model, tools, system: str = "", checkpointer=None):
        self.system = system
        # Initialize a state graph with the AgentState as the state type.
        graph = StateGraph(AgentState)
        
        # Add nodes for the LLM call and tool action.
        graph.add_node("llm", self.call_llm)
        graph.add_node("action", self.take_action)
        # Add a conditional edge: if actions exist, go to "action", otherwise finish (END).
        graph.add_conditional_edges("llm", self.exists_action, {True: "action", False: END})
        # Loop back from "action" to "llm".
        graph.add_edge("action", "llm")
        graph.set_entry_point("llm")
        
        # Compile the graph with the checkpointer and specify that you want an interrupt
        # before calling the "action" node (to allow manual approval, etc.).
        self.graph = graph.compile()
        # Store the available tools in a dictionary for quick lookup.
        self.tools = {t.name: t for t in tools}
        # Bind the tools to your language model.
        self.model = model.bind_tools(tools)

    def call_llm(self, state: AgentState):
        messages = state['messages']
        # Prepend the system message if one is defined.
        if self.system:
            messages = [SystemMessage(content=self.system)] + messages
        # Invoke the language model with the message history.
        message = self.model.invoke(messages)
        return {'messages': [message]}

    def exists_action(self, state: AgentState) -> bool:
        print("Current State:", state)
        # Get the last message (assume it has a 'tool_calls' attribute).
        result = state['messages'][-1]
        # Safely check for tool_calls.
        tool_calls = getattr(result, "tool_calls", [])
        return len(tool_calls) > 0

    def take_action(self, state: AgentState):
        # Retrieve tool calls from the last message.
        tool_calls = getattr(state['messages'][-1], "tool_calls", [])
        results = []
        for t in tool_calls:
            print(f"Calling: {t}")
            # Invoke the corresponding tool and capture its output.
            result = self.tools[t['name']].invoke(t['args'])
            # Create a ToolMessage from the tool's output.
            results.append(ToolMessage(tool_call_id=t['id'], name=t['name'], content=str(result)))
        print("Back to the model!")
        return {'messages': results}

# Create an instance of ChatOllama as your language model.
llm = HuggingFaceEndpoint(
    repo_id="microsoft/Phi-3.5-mini-instruct",
    task="text-generation",
    max_new_tokens=250,
    do_sample=False,
    model_kwargs={},
)
chat_model = ChatHuggingFace(llm=llm)

tool = TavilySearchResults(max_results=2)
abot = Agent(chat_model, [tool], system=prompt)