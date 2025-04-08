// src/components/Messages/Message.jsx
import React from "react";

const Message = ({ message, appearance }) => {
  return (
    <li className={`message ${appearance} appeared`}>
      <div className="text_wrapper">
        <div className="text">{message}</div>
      </div>
    </li>
  );
};

export default Message;
