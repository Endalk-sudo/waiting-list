const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
app.use(cors());

// Initialize Firebase Admin SDK
const serviceAccount = require('./path/to/serviceAccountKey.json'); // Replace with your service account key
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Define a route to handle submissions
app.post('/submit', async (req, res) => {
  const { email, feedback } = req.body;

  try {
    // Validate input (you should implement more robust validation)
    if (!email || !validateEmail(email)) {
      return res.status(400).send('Invalid email');
    }

    // Add data to Firestore
    await db.collection('submissions').add({
      email: email,
      feedback: feedback,
      timestamp: admin.firestore.FieldValue.serverTimestamp() // Optional: Add timestamp
    });

    res.status(200).send('Submission successful!');

  } catch (error) {
    console.error('Error submitting data:', error);
    res.status(500).send('Error processing submission');
  }
});

function validateEmail(email) {
  // Basic email validation, you might want to add more complex checks
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
