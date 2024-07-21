import React from "react";

// Define a functional component named Footer
const Footer = () => (
    // Footer element container
    <footer>
        {/* Newsletter subscription section */}
        <div className="newsletter">
            {/* Subscription prompt text */}
            <p>Subscribe to our newsletter</p>
            {/* Email input field for the newsletter subscription */}
            <input type="email" placeholder="Enter your email" />
            {/* Button to submit the subscription */}
            <button>Subscribe</button>
        </div>
        
        {/* Footer links section */}
        <div className="footer-links">
            {/* List of footer links */}
            <ul>
                {/* Link to the Privacy Policy page */}
                <li>
                    <a href="#">Privacy Policy</a>
                </li>
                {/* Link to the Terms of Service page */}
                <li>
                    <a href="#">Terms of Service</a>
                </li>
                {/* Link to the Contact Us page */}
                <li>
                    <a href="#">Contact Us</a>
                </li>
            </ul>
            
            {/* Social media icons section */}
            <div className="social-icons">
                {/* Link to the Facebook page with icon */}
                <a href="#">
                    <img src="facebook-icon.png" alt="Facebook" />
                </a>
                {/* Link to the Twitter page with icon */}
                <a href="#">
                    <img src="twitter-icon.png" alt="Twitter" />
                </a>
                {/* Link to the Instagram page with icon */}
                <a href="#">
                    <img src="instagram-icon.png" alt="Instagram" />
                </a>
            </div>
            
            {/* Language selector dropdown in the footer */}
            <div className="language-selector-footer">
                <select>
                    {/* Option for English language */}
                    <option value="en">English</option>
                    {/* Option for French language */}
                    <option value="fr">French</option>
                    {/* Option for Spanish language */}
                    <option value="es">Spanish</option>
                </select>
            </div>
        </div>
        
        {/* Bottom part of the footer */}
        <div className="footer-bottom">
            {/* Copyright text */}
            <p>&copy; 2023 Mwalimu AI. All rights reserved.</p>
        </div>
    </footer>
);

// Export the Footer component as the default export of this module
export default Footer;
