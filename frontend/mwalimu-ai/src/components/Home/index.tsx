import Header from "../Header/index"; // Import the Header component
import React from "react";
import { Link } from "react-router-dom"; // Import Link component from react-router-dom for navigation

// Define a functional component named Home
const Home = () => {
    return (
        // Main container for the homepage
        <div>
            {/* Main content area of the homepage */}
            <main className="homepage" id="homepage">
                {/* Main heading */}
                <h1>Welcome to Mwalimu AI</h1>
                {/* Tagline text */}
                <p className="tagline">Empowering Education Through AI</p>
                {/* Link to the level-selection page with a button */}
                <Link to="/level-selection">
                    <button className="primary-button">Get Started</button>
                </Link>
                {/* Empty paragraph for spacing */}
                <p></p>
                {/* Link to the login page with a button */}
                <Link to="/login">
                    <button className="secondary-button">
                        I already have an account
                    </button>
                </Link>
            </main>
        </div>
    );
};

// Export the Home component as the default export of this module
export default Home;
