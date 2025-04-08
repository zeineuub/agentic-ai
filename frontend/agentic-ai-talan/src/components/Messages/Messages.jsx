// src/components/Messages/Messages.jsx
import React, { useEffect, useRef } from "react";
import Message from "./Message";
import "./Messages.css";

const Messages = ({ messages }) => {
  const messagesEndRef = useRef(null);

  // Scroll to the bottom when messages change.
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <ul className="messages">
      {messages.map((msg, index) => (
        <Message key={index} message={msg.text} appearance={msg.user === "user" ? "user" : "bot"} />
      ))}
      <div ref={messagesEndRef} />
    </ul>
  );
};

export default Messages;
