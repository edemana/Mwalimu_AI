import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <nav>
      <div ></div>
      <div className="logo">Mwalimu AI</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/about-us">About Us</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      <div className="account-buttons">
        <Link to="/login"><button className="secondary-button">I already have an account</button></Link>
        <Link to="/level-selection"><button className="primary-button">Get Started</button></Link>
      </div>
      <div className="language-selector">
        <select id="language">
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
      </div>
    </nav>
  </header>
);

export default Header;
