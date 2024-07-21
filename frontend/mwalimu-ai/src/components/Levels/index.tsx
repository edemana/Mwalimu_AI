import React from "react";
import useStore from "../stores/index";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook from react-router-dom for navigation

// Define a functional component named Levels
const Levels = () => {
    const updateLevel = useStore((state) => state.updateLevel);
    const navigate = useNavigate(); // Initialize the navigate function for navigation

    // Function to handle sign-up navigation
    const toSignUp = (e: React.MouseEvent, level: string) => {
        e.preventDefault(); // Prevent the default form submission behavior
        updateLevel(level);
        navigate("/signup"); // Navigate to the signup page with the selected level as state
    };

    return (
        // Main container for level selection
        <main className="level-selection" id="level-selection">
            {/* Heading for the level selection section */}
            <h2>Select Your Level</h2>
            {/* Button for selecting Elementary level */}
            <button
                className="primary-button"
                onClick={(e) => toSignUp(e, "Elementary")}
            >
                Elementary
            </button>
            {/* Button for selecting High School level */}
            <button
                className="primary-button"
                onClick={(e) => toSignUp(e, "High School")}
            >
                High School
            </button>
            {/* Button for selecting College level */}
            <button
                className="primary-button"
                onClick={(e) => toSignUp(e, "College")}
            >
                College
            </button>
        </main>
    );
};

// Export the Levels component as the default export of this module
export default Levels;
