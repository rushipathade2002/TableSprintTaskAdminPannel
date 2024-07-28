// Sidebar.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaTh, FaList, FaBox } from 'react-icons/fa';
import logo from "../assets/imges/logo.jpg";
import './Sidebar.css';

export const Sidebar = () => {
  const location = useLocation();
  const [activeMenuItem, setActiveMenuItem] = useState(location.pathname);

  const handleMenuItemClick = (path) => {
    setActiveMenuItem(path);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo" style={{"color":"white"}}><img src={logo} alt="logo" height={50} /></div>
      <ul className="sidebar-menu">
        <li className={`menu-item ${activeMenuItem === '/Home' ? 'active' : ''}`}>
          <Link to="/Home" onClick={() => handleMenuItemClick('/Home')}>
            <FaHome />
            <span>Dashboard</span>
          </Link>
        </li>
        <li className={`menu-item ${activeMenuItem === '/category' ? 'active' : ''}`}>
          <Link to="/category" onClick={() => handleMenuItemClick('/category')}>
            <FaTh />
            <span>Category</span>
          </Link>
        </li>
        <li className={`menu-item ${activeMenuItem === '/subcategory' ? 'active' : ''}`}>
          <Link to="/subcategory" onClick={() => handleMenuItemClick('/subcategory')}>
            <FaList />
            <span>Subcategory</span>
          </Link>
        </li>
        <li className={`menu-item ${activeMenuItem === '/products' ? 'active' : ''}`}>
          <Link to="/products" onClick={() => handleMenuItemClick('/products')}>
            <FaBox />
            <span>Products</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

