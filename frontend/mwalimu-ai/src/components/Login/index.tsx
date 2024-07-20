import React, { useState } from "react";
import axios from "axios";
import { API_BASE, LOGIN_PATH } from "../../constants";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        axios
            .post(`${API_BASE}${LOGIN_PATH}`, {
                email,
                password,
            })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <main className="login-page" id="login-page">
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

                <button type="submit">Login</button>
                <div className="additional-options">
                    <label htmlFor="remember-me">
                        <input type="checkbox" id="remember-me" /> Remember me
                    </label>
                </div>
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

export default Login;
