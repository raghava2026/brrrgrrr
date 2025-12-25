import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Brrrgrrr</h3>
          <p>
            We serve the best handcrafted burgers made with fresh ingredients.
            Build your own or choose from our signature menu.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#build">Build Your Own</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>📧 Email: info@brrrgrrr.com</p>
          <p>📞 Phone: +1 234 567 8900</p>
          <p>📍 Address: 123 Burger St, Food City</p>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="#facebook" className="social-link">Facebook</a>
            <a href="#instagram" className="social-link">Instagram</a>
            <a href="#twitter" className="social-link">Twitter</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Brrrgrrr. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
