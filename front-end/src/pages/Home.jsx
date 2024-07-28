import React, { useState } from 'react';
import "./style.css";
import logo from "../assets/imges/logo.jpg";
import { FaUserCircle } from 'react-icons/fa';
import { Sidebar } from '../components/Sidebar';
import LogoutModal from '../components/LogoutModal';
import { useAuth } from './store/Auth';

export const Home = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { isLoggedIn, admin } = useAuth(); 

  const toggleLogoutModal = () => {
    setShowLogoutModal(!showLogoutModal);
  };

  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <header className="header">
          <div className="logo"></div>
          <div className="user-icon" onClick={toggleLogoutModal}>
            <FaUserCircle size={50} color="#fff" />
          </div>
        </header>
        <div className="content">
          <img src={logo} className='img' alt="" />
          <h1>Welcome to TableSprint admin</h1>
        </div>
      </div>
      
      {showLogoutModal && <LogoutModal toggleModal={toggleLogoutModal} />}
      
    </div>
  );
};

