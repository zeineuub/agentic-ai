import React, { useState, useEffect } from "react";
import Prompt from "../Prompt/Prompt";
import "./Chat.css";
import LandingPage from "../../pages/Landing/LandingPage";
import Messages from "../Messages/Messages";
import ThinkingMessage from "../Messages/ThinkingMessage";
const Chat = ({ isSidebarOpen }) => {
  const [messages, setMessages] = useState([]);
  const [showLanding, setShowLanding] = useState(true);
  const [hideLanding, setHideLanding] = useState(false); // New state for smooth animation
  const [isThinking, setIsThinking] = useState(false);
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
    setIsThinking(true);
    const response = await fetchMessage(msgText);
    // Add the bot reply to the list
    setMessages((prev) => [...prev, { text: response, user: "bot" }]);
    setIsThinking(false);
  };

  const fetchMessage = async (input) => {
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
        query: input,
      }),
    });
    const data = await response.json();
    console.log("found ",data.response);
    return data.response; // Assuming the response is in the format { response: "..." }
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
          {isThinking && <ThinkingMessage />}
          </div>
      )}
      
      <Prompt onSend={handleSendMessage} onInputFocus={handleInputFocus} />
    </div>
  );
};

export default Chat;
