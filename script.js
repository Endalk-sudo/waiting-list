const signupFeedbackForm = document.getElementById('signup-feedback-form');

// Replace with your actual Firebase config values:
const firebaseConfig = {
    apiKey: "AIzaSyAWtxcn8xru2L5fBxXCi_77TZG2bG2dBG8",
    authDomain: "email-collector-b67d9.firebaseapp.com",
    projectId: "email-collector-b67d9",
    storageBucket: "email-collector-b67d9.appspot.com",
    messagingSenderId: "451805349130",
    appId: "1:451805349130:web:675f9de57ce7f48e58e6f3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore(); // Get a reference to Firestore

signupFeedbackForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById('email').value;
    const feedbackMessage = document.getElementById('feedback-message').value;

    // Basic validation (you'll likely want to enhance this)
    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Add data to Firestore
    db.collection('submissions').add({
        email: email,
        feedback: feedbackMessage,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        // Redirect to the thank you page after successful submission
        window.location.href = "thankyou.html";
    })
    .catch(error => {
        console.error('Error submitting data:', error);
        alert('An error occurred. Please try again later.');
    });
});

function validateEmail(email) {
    return /^[^\\\\s@]+@[^\\\\s@]+\\\\.[^\\\\s@]+$/.test(email);
}

