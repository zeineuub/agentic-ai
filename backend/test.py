# Run this in a separate script or Jupyter Notebook to test manually
from services.orchestrator import abot  # Ensure this is the correct import path

test_input = {
    "messages": [{"role": "user", "content": "What is LangGraph?"}]
}

print("\n🟢 Testing LangGraph with Initial State:", test_input)

result = abot.graph.invoke(test_input)

print("\n🔵 Result from Graph Execution:", result)
