import React, { useState, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import "./Prompt.css";

const Prompt = ({ onSend, onInputFocus  }) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage(""); 
      if (inputRef.current) {
        inputRef.current.style.height = "45px"; 
      }
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
    if (inputRef.current) {
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 150)}px`; 
    }
  };


  return (
    <div className="prompt-container">
      <textarea
        ref={inputRef}
        className="prompt-input"
        placeholder="Type your message..."
        value={message}
        onChange={handleInputChange}
        onFocus={onInputFocus}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
      />
      <button className="send-btn" onClick={handleSend}>
        <SendIcon />
      </button>
    </div>
  );
};

export default Prompt;
