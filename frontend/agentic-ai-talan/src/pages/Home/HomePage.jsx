import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Chat from '../../components/Chat/Chat';
import './HomePage.css';

const HomePage = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedModel, setSelectedModel] = useState('GPT-4');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="home-page">
       <Sidebar 
        isOpen={isSidebarOpen} 
      />

      <div className={`content-container ${isSidebarOpen ? 'shifted' : ''}`}>
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onSelectModel={setSelectedModel} />
        
        <Chat  isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
};

export default HomePage;
