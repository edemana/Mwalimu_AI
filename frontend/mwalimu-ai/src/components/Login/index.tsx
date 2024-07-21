import React, { useState } from "react";
import axios from "axios";
import { API_BASE, LOGIN_PATH } from "../../constants"; // Import constants for API base URL and login path

// Define a functional component named Login
const Login = () => {
    // State variables for email and password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Function to handle form submission
    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault(); // Prevent the default form submission behavior
        axios
            .post(`${API_BASE}${LOGIN_PATH}`, { // Send POST request to the login endpoint
                email,
                password,
            })
            .then((res) => {
                console.log(res.data); // Log the response data on successful login
            })
            .catch((err) => {
                console.error(err); // Log any errors that occur during the request
            });
    };

    return (
        // Main container for the login page
        <main className="login-page" id="login-page">
            {/* Login form */}
            <form onSubmit={(e) => onSubmit(e)}>
                {/* Label and input for email */}
                <label htmlFor="email">Email:</label>
                <input
                    onChange={(e) => setEmail(e.target.value)} // Update email state on change
                    type="email"
                    id="email"
                    name="email"
                    required // Make this field required
                />

                {/* Label and input for password */}
                <label htmlFor="password">Password:</label>
                <input
                    onChange={(e) => setPassword(e.target.value)} // Update password state on change
                    type="password"
                    id="password"
                    name="password"
                    required // Make this field required
                />

                {/* Submit button for the form */}
                <button type="submit">Login</button>
                
                {/* Additional options like "Remember me" */}
                <div className="additional-options">
                    <label htmlFor="remember-me">
                        <input type="checkbox" id="remember-me" /> Remember me
                    </label>
                </div>
                
                {/* Social login buttons */}
                <div className="social-login">
                    <button className="google-login">Login with Google</button>
                    <button className="facebook-login">
                        Login with Facebook
                    </button>
                </div>
            </form>
        </main>
    );
};

// Export the Login component as the default export of this module
export default Login;
