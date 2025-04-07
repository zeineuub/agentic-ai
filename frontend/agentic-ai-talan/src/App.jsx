import { AuthProvider, useAuth } from './utils/AuthContext';
import { useTheme } from "./utils/Theme";
import React, { useState } from 'react';
import HomePage from './pages/Home/HomePage';
import AuthPage from './pages/Auth/AuthPage';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
function App() {
  const { theme } = useTheme();

  return (
    <AuthProvider>
      <div className={`app ${theme}`}>
        <Router>
          <Routes>
            <Route path="/" element={<RootRedirect />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/home" element={<ProtectedHome />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

const RootRedirect = () => {
  const { user } = useAuth();
  console.log("user   ", user);
  return <Navigate to={user ? "/home" : "/auth"} replace />;
};

const ProtectedHome = () => {
  const { user } = useAuth();
  console.log("user home  ", user);
  return user ? <HomePage /> : <Navigate to="/auth" replace />;
};

export default App;