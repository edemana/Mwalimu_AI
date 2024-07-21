import { propState } from "@/types"; // Importing types (though not used in this component)
import React from "react";

// Define a functional component named SignUp
const SignUp = () => {
    return (
        // Main container for the sign-up page
        <main className="signup-page" id="signup-page">
            {/* Form element for user sign-up */}
            <form>
                {/* Label and input for Name */}
                <label htmlFor="name">Name:</label>
                <input
                    type="text" // Input type for text responses
                    id="name" // Unique ID for the Name input
                    name="name" // Name attribute for the input
                    required // Make this field required
                />

                {/* Label and input for Email */}
                <label htmlFor="email">Email:</label>
                <input
                    type="email" // Input type for email responses
                    id="email" // Unique ID for the Email input
                    name="email" // Name attribute for the input
                    required // Make this field required
                />

                {/* Label and input for Password */}
                <label htmlFor="password">Password:</label>
                <input
                    type="password" // Input type for password responses
                    id="password" // Unique ID for the Password input
                    name="password" // Name attribute for the input
                    required // Make this field required
                />

                {/* Label and input for Confirm Password */}
                <label htmlFor="confirm-password">Confirm Password:</label>
                <input
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
