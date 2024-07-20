import React from 'react';

const Footer = () => (
  <footer>
    <div className="newsletter">
      <p>Subscribe to our newsletter</p>
      <input type="email" placeholder="Enter your email" />
      <button>Subscribe</button>
    </div>
    <div className="footer-links">
      <ul>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Terms of Service</a></li>
        <li><a href="#">Contact Us</a></li>
      </ul>
      <div className="social-icons">
        <a href="#"><img src="facebook-icon.png" alt="Facebook" /></a>
        <a href="#"><img src="twitter-icon.png" alt="Twitter" /></a>
        <a href="#"><img src="instagram-icon.png" alt="Instagram" /></a>
      </div>
      <div className="language-selector-footer">
        <select>
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; 2023 Mwalimu AI. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
