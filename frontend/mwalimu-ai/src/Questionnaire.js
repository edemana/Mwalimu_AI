import React from 'react';

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

export default Questionnaire;
