import React from 'react';
import { useNavigate } from 'react-router-dom';

const LevelSelection = () => {
  const navigate = useNavigate();

  return (
    <main className="level-selection" id="level-selection">
      <h2>Select Your Level</h2>
      <button className="primary-button" onClick={() => navigate('/questionnaire')}>
        Elementary
      </button>
      <button className="primary-button" onClick={() => navigate('/questionnaire')}>
        High School
      </button>
      <button className="primary-button" onClick={() => navigate('/questionnaire')}>
        College
      </button>
    </main>
  );
};

export default LevelSelection;
