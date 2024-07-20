import Footer from "../Footer/index";
import Header from "../Header/index";
import Home from "../Home/index";
import Login from "../Login/index";
import SignIn from "../SignIn/index";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Main = () => {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/*" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignIn />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default Main;
