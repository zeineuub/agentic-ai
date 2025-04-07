// src/components/Header/Header.js
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import './Header.css';

const Header = ({ 
  isSidebarOpen, 
  toggleSidebar, 
  onCreateNewChat, 
  onSelectModel 
}) => {
  const [selectedModel, setSelectedModel] = useState('GPT-4');
  const models = ['GPT-4', 'Claude-2', 'Llama-2', 'Private'];

  const handleSelect = (model) => {
    setSelectedModel(model);
    onSelectModel(model);
  };

  return (
    <div className="header">
    
        <button className={`sidebar-toggle ${isSidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}>
          <MenuOpenIcon />
        </button>


      {!isSidebarOpen && <div className="header-right">
        <button className="new-chat-btn" onClick={onCreateNewChat}>
          <AddIcon />
        </button>
      </div>
    }
     
    </div>
  );
};

export default Header;
