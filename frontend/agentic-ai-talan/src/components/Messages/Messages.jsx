// src/components/Messages/Messages.jsx
import React, { useEffect, useRef } from "react";
import Message from "./Message";
import "./Messages.css";

const Messages = ({ messages }) => {
  const messagesEndRef = useRef(null);

  // Scroll to the bottom when messages change.
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" , block: "nearest" });
    }
  }, [messages]);
  const handleCopy = (messageText) => {
    navigator.clipboard.writeText(messageText)
    
  }
  return (
    <ul className="messages">
      {messages.map((msg, index) => (
        <Message onCopy={() => handleCopy(msg.text)} key={index} message={msg.text} appearance={msg.user === "user" ? "user" : "bot"} />
      ))}
      <div ref={messagesEndRef} />
    </ul>
  );
};

export default Messages;
