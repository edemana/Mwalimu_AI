import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE, LOGIN_PATH } from "../../constants";
import useStore from "../stores";
import { writeToCookie, writeToLocalStore } from "../utils";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const updateEmail = useStore((state) => state.updateEmail);
    const updateId = useStore((state) => state.updateId);
    const updateLevel = useStore((state) => state.updateLevel);
    const clearEmail = useStore((state) => state.clearEmail);
    const clearId = useStore((state) => state.clearId);
    const setAuth = useStore((state) => state.setAuth);

    const userEmail = useStore((state) => state.user.email);
    const userId = useStore((state) => state.user.id);
    const isUserAuthed = useStore((state) => state.user.isAuthed);

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        axios
            .post(`${API_BASE}${LOGIN_PATH}`, {
                email,
                password,
            })
            .then((res) => {
                console.log(res.data);
                const { email, id, accessToken, refreshToken, level } =
                    res.data.userDetails;
                writeToCookie("accessToken", accessToken);
                writeToCookie("refreshToken", refreshToken);
                setAuth(true);
                updateEmail(email);
                updateId(id);
                updateLevel(level);
                setEmail("");
                setPassword("");
                navigate("/topics");
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    id="email"
                    name="email"
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    value={password}
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
