import React from 'react';

// Define a functional component named SignupPage
const SignupPage = () => (
  // Main container for the signup page
  <main className="signup-page" id="signup-page">
    {/* Signup form */}
    <form>
      {/* Label and input for name */}
      <label htmlFor="name">Name:</label>
      <input 
        type="text" 
        id="name" 
        name="name" 
        required // Make this field required
      />

      {/* Label and input for email */}
      <label htmlFor="email">Email:</label>
      <input 
        type="email" 
        id="email" 
        name="email" 
        required // Make this field required
      />

      {/* Label and input for password */}
      <label htmlFor="password">Password:</label>
      <input 
        type="password" 
        id="password" 
        name="password" 
        required // Make this field required
      />

      {/* Label and input for confirm password */}
      <label htmlFor="confirm-password">Confirm Password:</label>
      <input 
        type="password" 
        id="confirm-password" 
        name="confirm-password" 
        required // Make this field required
      />

      {/* Submit button for the form */}
      <button type="submit">Sign Up</button>
    </form>
  </main>
);

export default SignupPage;
