import React, { useState } from 'react';
import './styles.css';

const App = () => {
  const [view, setView] = useState('homepage');

  const showView = (viewName) => setView(viewName);

  return (
    <div>
      <Header showView={showView} />
      {view === 'homepage' && <Homepage showView={showView} />}
      {view === 'login-page' && <LoginPage showView={showView} />}
      {view === 'level-selection' && <LevelSelection showView={showView} />}
      {view === 'questionnaire' && <Questionnaire showView={showView} />}
      {view === 'course-selection' && <CourseSelection />}
      {view === 'topic-exploration' && <TopicExploration />}
      <Footer />
    </div>
  );
};

const Header = ({ showView }) => (
  <header>
    <nav>
      <div className="logo">Mwalimu AI</div>
      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Courses</a></li>
        <li><a href="#">About Us</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
      <div className="account-buttons">
        <button className="secondary-button" onClick={() => showView('login-page')}>I already have an account</button>
        <button className="primary-button" onClick={() => showView('homepage')}>Get Started</button>
      </div>
      <div className="language-selector">
        <select id="language">
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
      </div>
    </nav>
  </header>
);

const Homepage = ({ showView }) => (
  <main className="homepage" id="homepage">
    <h1>Welcome to Mwalimu AI</h1>
    <p className="tagline">Empowering Education Through AI</p>
    <button className="primary-button" onClick={() => showView('level-selection')}>Get Started</button>
    <button className="secondary-button" onClick={() => showView('login-page')}>
      I already have an account
    </button>
  </main>
);

const LoginPage = ({ showView }) => (
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

const LevelSelection = ({ showView }) => (
  <main className="level-selection" id="level-selection">
    <h2>Select Your Level</h2>
    <button className="primary-button" onClick={() => showView('questionnaire')}>
      Beginner
    </button>
    <button className="primary-button" onClick={() => showView('questionnaire')}>
      Intermediate
    </button>
    <button className="primary-button" onClick={() => showView('questionnaire')}>
      Advanced
    </button>
  </main>
);

const Questionnaire = () => (
  <main className="questionnaire" id="questionnaire">
    <h2>Questionnaire</h2>
    <form>
      <label htmlFor="question1">Question 1:</label>
      <input type="text" id="question1" name="question1" required />

      <label htmlFor="question2">Question 2:</label>
      <input type="text" id="question2" name="question2" required />

      <button type="submit">Submit</button>
    </form>
  </main>
);

const CourseSelection = () => (
  <main className="course-selection" id="course-selection">
    <h2>Course Selection</h2>
    <div className="course-grid">
      <div className="course-card">
        <h3>Course 1</h3>
        <p>Description of Course 1</p>
      </div>
      <div className="course-card">
        <h3>Course 2</h3>
        <p>Description of Course 2</p>
      </div>
      <div className="course-card">
        <h3>Course 3</h3>
        <p>Description of Course 3</p>
      </div>
    </div>
  </main>
);

const TopicExploration = () => (
  <main className="topic-exploration" id="topic-exploration">
    <h2>Topic Exploration</h2>
    <div className="chat-interface">
      <div className="chat-window">
        {/* Chat messages will appear here */}
      </div>
    </div>
    <div className="progress-bar">
      <div className="progress"></div>
    </div>
  </main>
);

const Footer = () => (
  <footer>
    <div className="newsletter">
      <p>Subscribe to our newsletter</p>
      <input type="email" placeholder="Enter your email" />
      <button>Subscribe</button>
    </div>
    <div className="footer-links">
      <ul>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Terms of Service</a></li>
        <li><a href="#">Contact Us</a></li>
      </ul>
      <div className="social-icons">
        <a href="#"><img src="facebook-icon.png" alt="Facebook" /></a>
        <a href="#"><img src="twitter-icon.png" alt="Twitter" /></a>
        <a href="#"><img src="instagram-icon.png" alt="Instagram" /></a>
      </div>
      <div className="language-selector-footer">
        <select>
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; 2023 Mwalimu AI. All rights reserved.</p>
    </div>
  </footer>
);

export default App;
