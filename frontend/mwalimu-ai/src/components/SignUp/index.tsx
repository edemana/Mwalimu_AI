import React, { useState } from "react";
import { API_BASE, SIGNUP_PATH } from "../../constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useStore from "../stores";

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
        <main className="signup-page" id="signup-page">
            <form onSubmit={(e) => onSubmit(e)}>
                <label htmlFor="email">Email:</label>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    id="email"
                    name="email"
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="password"
                    name="password"
                    required
                />

                <label htmlFor="confirm-password">Confirm Password:</label>
                <input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    id="confirm-password"
                    name="confirm-password"
                    required
                />

                <button type="submit">Sign Up</button>
            </form>
        </main>
    );
};

export default SignUp;
