import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./Home/index.tsx";
import Login from "./Login/index.tsx";
import SignIn from "./SignIn/index.tsx";
import Main from "./Main/index";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
const router = (
    <React.StrictMode>
        <Main />
    </React.StrictMode>
);

root.render(router);
