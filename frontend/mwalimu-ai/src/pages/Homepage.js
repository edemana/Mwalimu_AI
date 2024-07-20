import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => (
  <main className="homepage" id="homepage">
    <h1>Welcome to Mwalimu AI</h1>
    <p className="tagline">Empowering Education Through AI</p>
    <Link to="/level-selection"><button className="primary-button">Get Started</button></Link>
    <p></p>
    <Link to="/login"><button className="secondary-button">I already have an account</button></Link>
  </main>
);

export default Homepage;
