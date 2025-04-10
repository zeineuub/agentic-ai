// src/components/Messages/Message.jsx
import React from "react";
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
const Message = ({ message, appearance,onCopy }) => {
 
  return (
    <li className={`message ${appearance} appeared`}>

      <div className="text_wrapper">
        <button   className="copy-button" onClick={onCopy} title="Copy message">
         <span  className="tooltiptext">Copy</span>
          <ContentCopyOutlinedIcon fontSize="small" className="copy-input" />
        </button>

        <div className="text">{message}</div>
      </div>
    </li>
    

  );
};

export default Message;
