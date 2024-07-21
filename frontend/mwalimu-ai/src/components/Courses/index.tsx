import React from "react";

// Define a functional component named Courses
const Courses = () => (
    // Main container for the course selection section
    <main className="course-selection" id="course-selection">
        {/* Heading for the course selection section */}
        <h2>Course Selection</h2>
        
        {/* Container for the course cards */}
        <div className="course-grid">
            {/* Individual course card */}
            <div className="course-card">
                {/* Title of Course 1 */}
                <h3>Course 1</h3>
                {/* Description of Course 1 */}
                <p>Description of Course 1</p>
            </div>
            
            {/* Individual course card */}
            <div className="course-card">
                {/* Title of Course 2 */}
                <h3>Course 2</h3>
                {/* Description of Course 2 */}
                <p>Description of Course 2</p>
            </div>
            
            {/* Individual course card */}
            <div className="course-card">
                {/* Title of Course 3 */}
                <h3>Course 3</h3>
                {/* Description of Course 3 */}
                <p>Description of Course 3</p>
            </div>
        </div>
    </main>
);

// Export the Courses component as the default export of this module
export default Courses;
