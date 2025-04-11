# Run this in a separate script or Jupyter Notebook to test manually
from services.orchestrator import abot  # Ensure this is the correct import path
from langchain_core.messages import HumanMessage
test_input = {
    "messages": [
        HumanMessage(role="user", content="What is LangGraph?")
    ]
}

initial_state = {"messages": [{"role": "user", "content": "What is LangGraph?"}]}
print("\n🟢 Testing LangGraph with Initial State:", initial_state)

result = abot.graph.invoke(test_input)

print("\n🔵 Result from Graph Execution:", result)
