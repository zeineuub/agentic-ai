import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTheme } from '../../utils/Theme';
import AddIcon from '@mui/icons-material/Add';
import logo from '../../assets/images/talan-image.png';
import './Sidebar.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Icône pour le thème
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Icône pour la déconnexion
import { useAuth } from '../../utils/AuthContext';
const Sidebar = ({ isOpen }) => {
  const { theme, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'} bg-body-tertiary`}>
      <div className="sidebar-header border-bottom p-3">
        <img src={logo} className="company-logo" alt="Logo" height="40" />
        <div onClick={() => console.log("new chat")} className="new-chat-btn">
          <AddIcon />
        </div>
      </div>

      <div className="sidebar-footer border-top p-3">
        <Dropdown show={isDropdownOpen} onToggle={setIsDropdownOpen} align="end">
          <Dropdown.Toggle className="custom-dropdown-toggle" onClick={toggleDropdown}>
            {user.email.split('@')[0]}...
            {isDropdownOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </Dropdown.Toggle>

          <Dropdown.Menu className="custom-dropdown-menu">
            <Dropdown.Item onClick={toggleTheme}>
              <Brightness4Icon className="dropdown-icon" />
              {theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logout}>
              <ExitToAppIcon className="dropdown-icon" />
              Déconnexion
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Sidebar;
