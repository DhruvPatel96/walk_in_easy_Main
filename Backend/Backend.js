// Import required modules
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// Initialize express app and set port number
const app = express();
const port = 3000;

// Configure the MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'equinox'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.log('Error connecting to database: ' + err);
    return;
  }
  console.log('Connected to database successfully!');
});

// Configure the body parser middleware to parse incoming requests
app.use(bodyParser.urlencoded({ extended: true }));


// Route for user signup
const signupPatient = require('./functions/signupPatient');

// Handle POST requests to the '/patients' endpoint
router.post('/signupPatient', (req, res) => {
  // Extract patient data from the request body
  const patientInfo = req.body;

  // Call the 'signupPatient' function to insert the patient data into the database
  signupPatient(patientInfo, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error signing up patient');
    } else {
      res.status(200).send('Patient signed up successfully');
    }
  });
});

// Route for user signin
app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, result) => {
    if (err) {
      console.log('Error retrieving user from database: ' + err);
      res.sendStatus(500);
      return;
    }
    if (result.length === 0) {
      console.log('Invalid email or password!');
      res.sendStatus(401);
      return;
    }
    console.log('User signed in successfully!');
    res.sendStatus(200);
  });
});

// Route for customer search
app.get('/customers', (req, res) => {
  const { name } = req.query;
  connection.query('SELECT * FROM customers WHERE name LIKE ?', `%${name}%`, (err, result) => {
    if (err) {
      console.log('Error retrieving customers from database: ' + err);
      res.sendStatus(500);
      return;
    }
    console.log('Customers retrieved successfully!');
    res.status(200).json(result);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

