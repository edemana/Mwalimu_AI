import React from 'react';

const LoginPage = () => (
  <main className="login-page" id="login-page">
    <form>
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" required />

      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" required />

      <button type="submit">Login</button>
      <div className="additional-options">
        <label htmlFor="remember-me">
          <input type="checkbox" id="remember-me" /> Remember me
        </label>
      </div>
      <div className="social-login">
        <button className="google-login">Login with Google</button>
        <button className="facebook-login">Login with Facebook</button>
      </div>
    </form>
  </main>
);

export default LoginPage;
