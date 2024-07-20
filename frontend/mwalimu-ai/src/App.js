import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import LevelSelection from './pages/LevelSelection';
import Questionnaire from './pages/Questionnaire';
import CourseSelection from './pages/CourseSelection';
import TopicExploration from './pages/TopicExploration';
import Footer from './components/Footer';
import './styles.css';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/level-selection" element={<LevelSelection />} />
      <Route path="/questionnaire" element={<Questionnaire />} />
      <Route path="/course-selection" element={<CourseSelection />} />
      <Route path="/topic-exploration" element={<TopicExploration />} />
    </Routes>
    <Footer />
  </Router>
);

export default App;
