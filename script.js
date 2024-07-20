document.querySelector('.primary-button').addEventListener('click', getStarted);
document.querySelector('.secondary-button').addEventListener('click', login);

function getStarted() {
  document.getElementById('homepage').style.display = 'none';
  document.getElementById('level-selection').style.display = 'block';
}

function login() {
  document.getElementById('homepage').style.display = 'none';
  document.getElementById('login-page').style.display = 'block';
}

function selectLevel(level) {
  document.getElementById('level-selection').style.display = 'none';
  document.getElementById('questionnaire').style.display = 'block';
}

// Function to handle form submissions, progress bar updates, etc., can be added here.
