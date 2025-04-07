import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import "./Prompt.css";
const Prompt = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message); // Envoie le message au parent
      setMessage(""); // Réinitialise l'input
    }
  };

  return (
    <div className="prompt-container">
      <textarea
        rows="1"
        cols="50"
        type="text"
        placeholder="Type your message..."
        className="prompt-input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()} // Envoi avec "Entrée"
      />
      <button className="send-btn" onClick={handleSend}>
        <SendIcon />
      </button>
    </div>
  );
};

export default Prompt;
