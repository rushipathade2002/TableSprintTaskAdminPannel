import React from 'react';
import './LogoutModal.css';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../pages/store/Auth';

const LogoutModal = ({ toggleModal }) => {
  const { LogoutUser } = useAuth();
  const history = useNavigate();

  const handleLogout = () => {
    LogoutUser();
    history('/login'); // Redirect to the login page or any other desired page after logout
  };

  return (
    <div className="logout-modal-overlay">
      <div className="logout-modal">
        <FaExclamationTriangle size={50} color="red" />
        <h2>Log Out</h2>
        <p>Are you sure you want to log out?</p>
        <div className="logout-modal-buttons">
          <button onClick={handleLogout} className="delete-button">Logout</button>
          <button onClick={toggleModal} className="confirm-button">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
