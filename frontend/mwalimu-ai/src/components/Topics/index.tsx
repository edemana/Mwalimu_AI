import React from "react";

// Define a functional component named TopicExploration
const Topics = () => (
    // Main container for the topic exploration page
    <main className="topic-exploration" id="topic-exploration">
        {/* Heading for the topic exploration section */}
        <h2>Topic Exploration</h2>

        {/* Container for the chat interface */}
        <div className="chat-interface">
            {/* Container for displaying chat messages */}
            <div className="chat-window">
                {/* Chat messages will appear here */}
            </div>
        </div>

        {/* Container for the progress bar */}
        <div className="progress-bar">
            {/* Actual progress bar element */}
            <div className="progress"></div>
        </div>
    </main>
);

export default Topics;
