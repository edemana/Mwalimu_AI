import Courses from "../Courses/index";
import Footer from "../Footer/index";
import Header from "../Header/index";
import Home from "../Home/index";
import Levels from "../Levels/index";
import Login from "../Login/index";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "../SignUp/index";

const Main = () => {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/*" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/level-selection" element={<Levels />} />
                    <Route path="/signup" element={<SignUp />} />/
                    <Route path="/courses" element={<Courses />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default Main;
