// Event listeners
document.querySelector('.primary-button').addEventListener('click', getStarted);
document.querySelector('.secondary-button').addEventListener('click', login);

// Function to show level selection page
function getStarted() {
    document.getElementById('homepage').classList.remove('active');
    document.getElementById('level-selection').classList.add('active');
}

// Function to show login page
function login() {
    document.getElementById('homepage').classList.remove('active');
    document.getElementById('login-page').classList.add('active');
}

// Function to handle level selection and show questionnaire page
function selectLevel(level) {
    console.log('Selected Level:', level); // You can use this level for further processing
    document.getElementById('level-selection').classList.remove('active');
    document.getElementById('questionnaire').classList.add('active');
}

// Handle form submissions
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Handle login logic here
    alert('Login form submitted');
});

document.getElementById('questionnaire-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Handle questionnaire submission here
    alert('Questionnaire submitted');
    updateProgressBar();
});

// Function to update progress bar
function updateProgressBar() {
    let progressBar = document.getElementById('progress-bar');
    let width = parseFloat(progressBar.style.width);
    let interval = setInterval(function() {
        if (width >= 100) {
            clearInterval(interval);
        } else {
            width += 10; // Increment progress
            progressBar.style.width = width + '%';
        }
    }, 500); // Update every 500ms
}