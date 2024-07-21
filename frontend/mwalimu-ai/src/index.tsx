import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import routing components from react-router-dom
import "./index.css"; // Import global CSS styles
import Home from "./components/Home/index.tsx"; // Import the Home component
import Login from "./components/Login/index.tsx"; // Import the Login component
import SignIn from "./components/SignIn/index.tsx"; // Import the SignIn component
import Main from "./components/Main/index"; // Import the Main component

// Get the root element from the HTML document where the React app will be rendered
const container = document.getElementById("root");

// Create a root for the React application
const root = ReactDOM.createRoot(container);

// Define the router component to be rendered
const router = (
    <React.StrictMode>
        {/* Wrap the Main component with React.StrictMode for highlighting potential problems */}
        <Main />
    </React.StrictMode>
);

// Render the router component to the root element
root.render(router);
