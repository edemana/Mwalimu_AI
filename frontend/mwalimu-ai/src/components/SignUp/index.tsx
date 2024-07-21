import React, { useState } from "react";
import { API_BASE, SIGNUP_PATH } from "../../constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useStore from "../stores";

// Define a functional component named SignUp
const SignUp = () => {
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");
    const level = useStore((state) => state.level);
    const nav = useNavigate();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        axios
            .post(`${API_BASE}${SIGNUP_PATH}`, {
                email,
                password,
                level,
            })
            .then((res) => {
                console.log(res.data);
                nav("/login");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        // Main container for the sign-up page
        <main className="signup-page" id="signup-page">
            <form onSubmit={onSubmit}>
                {/* Label and input for Email */}
                <label htmlFor="email">Email:</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email" // Input type for email responses
                    id="email" // Unique ID for the Email input
                    name="email" // Name attribute for the input
                    required // Make this field required
                />

                {/* Label and input for Password */}
                <label htmlFor="password">Password:</label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" // Input type for password responses
                    id="password" // Unique ID for the Password input
                    name="password" // Name attribute for the input
                    required // Make this field required
                />

                {/* Label and input for Confirm Password */}
                <label htmlFor="confirm-password">Confirm Password:</label>
                <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password" // Input type for password responses
                    id="confirm-password" // Unique ID for the Confirm Password input
                    name="confirm-password" // Name attribute for the input
                    required // Make this field required
                />

                {/* Submit button for the form */}
                <button type="submit">Sign Up</button>
            </form>
        </main>
    );
};

// Export the SignUp component as the default export of this module
export default SignUp;
