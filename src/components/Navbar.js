import React from 'react';
import { useCart } from '../contexts/CartContext';
import './Navbar.css';

const Navbar = ({ onShowAuth, onShowCart, currentUser }) => {
  const { totalItems } = useCart();
  
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <img src="/logo.png" alt="Brrrgrrr Logo" className="logo-img" />
          <span className="logo-text">Brrrgrrr</span>
        </div>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="#home" className="nav-link">Home</a>
          </li>
          <li className="nav-item">
            <a href="#menu" className="nav-link">Menu</a>
          </li>
          <li className="nav-item">
            <a href="#build" className="nav-link">Build Your Own Burger</a>
          </li>
        </ul>
        
        <div className="nav-actions">
          {currentUser ? (
            <div className="user-info">
              <span>Welcome, {currentUser.name}</span>
            </div>
          ) : (
            <button className="auth-btn" onClick={onShowAuth}>
              Login
            </button>
          )}
          
          <div className="cart-icon" onClick={onShowCart}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {totalItems > 0 && (
              <span className="cart-count">{totalItems}</span>
            )}
          </div>
        </div>
        
        <div className="hamburger">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;