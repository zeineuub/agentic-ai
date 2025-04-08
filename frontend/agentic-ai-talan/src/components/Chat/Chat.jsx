import React, { useState, useEffect } from "react";
import Prompt from "../Prompt/Prompt";
import "./Chat.css";
import LandingPage from "../../pages/Landing/LandingPage";
import Messages from "../Messages/Messages";

const Chat = ({ isSidebarOpen }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showLanding, setShowLanding] = useState(true);
  const [hideLanding, setHideLanding] = useState(false); // New state for smooth animation

  useEffect(() => {
    if (messages.length === 0) {
      setShowLanding(true);
      setHideLanding(false);
    }

  }, [messages]);

  const handleInputFocus = () => {
    setHideLanding(true); 
    setTimeout(() => setShowLanding(false), 500); 
  };

  const handleSendMessage = async (msgText) => {
    // Add the user message to the list
    setMessages((prev) => [...prev, { text: msgText, user: "user" }]);

    const response = await fetchMessage(msgText);
    // Add the bot reply to the list
    setMessages((prev) => [...prev, { text: response, user: "bot" }]);
  };

  const fetchMessage = async (input) => {
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OpenAIAPIKey}`,
      },
      body: JSON.stringify({
        prompt: `You: ${input}\nAI:`,
        max_tokens: 150,
      }),
    });
    const data = await response.json();
    return data.choices[0].text.trim();
  };

  return (
    <div className="chat">
      {showLanding && (
        <div className={`landing-page ${hideLanding ? "hidden" : ""}`}>
          <LandingPage />
        </div>
      )}
      {!showLanding && (
        <div className="chat-messages ">
          <Messages messages={messages} />
          </div>
      )}
      
      <Prompt onSend={handleSendMessage} onInputFocus={handleInputFocus} />
    </div>
  );
};

export default Chat;
