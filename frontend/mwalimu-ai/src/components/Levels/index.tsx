import React from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../stores/index";

const Levels = () => {
    const navigate = useNavigate();
    const updateLevel = useStore((state) => state.updateLevel);

    const toSignUp = (e: React.MouseEvent, level: string) => {
        e.preventDefault();
        updateLevel(level);
        navigate("/signup");
    };

    return (
        <main className="level-selection" id="level-selection">
            <h2>Select Your Level</h2>
            <button
                className="primary-button"
                onClick={(e) => toSignUp(e, "Elementary")}
            >
                Elementary
            </button>
            <button
                className="primary-button"
                onClick={(e) => toSignUp(e, "High School")}
            >
                High School
            </button>
            <button
                className="primary-button"
                onClick={(e) => toSignUp(e, "College")}
            >
                College
            </button>
        </main>
    );
};

export default Levels;
