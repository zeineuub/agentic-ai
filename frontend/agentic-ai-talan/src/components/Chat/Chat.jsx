import React, { useState } from "react";
import Prompt from "../Prompt/Prompt";
import "./Chat.css";

const Chat = ({isSidebarOpen}) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
  
    const handleSendMessage = async () => {
      setMessages([...messages, { text: input, user: 'user' }]);
      const response = await fetchMessage(input);
      setMessages([...messages, { text: response, user: 'bot' }]);
      setInput('');
    };
    const fetchMessage = async (input) => {
        const response = await fetch('http://localhost:3000/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OpenAIAPIKey}`
          },
          body: JSON.stringify({
            prompt: `You: ${input}\nAI:`,
            max_tokens: 150
          })
        });
        const data = await response.json();
        return data.choices[0].text.trim();
      };

  return (
    <div className="chat">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-bubble ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <Prompt onSend={handleSendMessage} />
    </div>
  );
};

export default Chat;
