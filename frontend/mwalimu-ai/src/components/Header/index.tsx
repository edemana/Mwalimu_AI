import React from "react";
import { Link } from "react-router-dom";

// Define a functional component named Header
const Header = () => (
    // Header element container
    <header>
        {/* Navigation bar */}
        <nav>
            {/* Empty div for potential logo or additional elements */}
            <div></div>
            
            {/* Logo section */}
            <div className="logo">Mwalimu AI</div>
            
            {/* Navigation links */}
            <ul className="nav-links">
                {/* Link to the Home page */}
                <li>
                    <Link to="/">Home</Link>
                </li>
                {/* Link to the Courses page */}
                <li>
                    <Link to="/courses">Courses</Link>
                </li>
                {/* Link to the About Us page */}
                <li>
                    <Link to="/about-us">About Us</Link>
                </li>
                {/* Link to the Contact page */}
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>
            
            {/* Account buttons section */}
            <div className="account-buttons">
                {/* Button for users who already have an account */}
                <Link to="/login">
                    <button className="secondary-button">
                        I already have an account
                    </button>
                </Link>
                {/* Button for new users to get started */}
                <Link to="/level-selection">
                    <button className="primary-button">Get Started</button>
                </Link>
            </div>
            
            {/* Language selector dropdown */}
            <div className="language-selector">
                <select id="language">
                    {/* Option for English language */}
                    <option value="en">English</option>
                    {/* Option for French language */}
                    <option value="fr">French</option>
                    {/* Option for Spanish language */}
                    <option value="es">Spanish</option>
                </select>
            </div>
        </nav>
    </header>
);

// Export the Header component as the default export of this module
export default Header;
