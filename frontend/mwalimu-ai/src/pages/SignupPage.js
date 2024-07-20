import React from 'react';

const SignupPage = () => (
  <main className="signup-page" id="signup-page">
    <form>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" required />

      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" required />

      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" required />

      <label htmlFor="confirm-password">Confirm Password:</label>
      <input type="password" id="confirm-password" name="confirm-password" required />

      <button type="submit">Sign Up</button>
    </form>
  </main>
);

export default SignupPage;