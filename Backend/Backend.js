// Import required modules
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const secretKey = 'mySecretKey';
const cors = require('cors');

// Initialize express app and set port number
const app = express();
const port = process.env.PORT || 3000;

//cors error
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Configure the MySQL connection
const connection = mysql.createConnection({
  host: "sql9.freemysqlhosting.net",
  user: "sql9604312",
  password: "PUsbBZf2Pr",
  database: "sql9604312",
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.log("Error connecting to database: " + err);
    return;
  }
  console.log("Connected to database successfully!");
});

// Configure the body parser middleware to parse incoming requests
app.use(bodyParser.json());

// Route for user signup
const signupPatient = require("./functions");

// Handle POST requests to the '/signupPatient' endpoint
app.post("/signupPatient", (req, res) => {
  // Extract patient data from the request body
  const patientInfo = req.body;
  console.log(patientInfo);

  // Call the 'signupPatient' function to insert the patient data into the database
  signupPatient.signupPatient(
    patientInfo,
    (error, results) => {
      if (error && error.code == "ER_DUP_ENTRY") {
        res.status(409).send("User already registered!");
      } else if (error) {
        console.log(error);
        res.status(500).send("Error signing up patient");
      } else {
        res.status(200).send("Patient signed up successfully");
      }
    },
    connection
  );
});

// Route for user signin
app.post('/signinPatient', (req, res) => {
  const { email, password } = req.body;
  connection.query('SELECT * FROM patients WHERE email = ? AND password = ?', [email, password], (err, result) => {
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

    // Create a JWT token with a payload containing the user ID
    const token = jwt.sign({ userId: result[0].id }, secretKey);

    // Set the token in the response headers
    res.setHeader('Authorization', `Bearer ${token}`);

    // Send a response with the token and any other information you need
    res.status(200).json({
      message: 'User signed in successfully!',
      token: token
    });
  });
});

// Route for clinic signup
const signupClinic = require("./functions");

// Handle POST requests to the '/signupPatient' endpoint
app.post("/signupClinic", (req, res) => {
  // Extract patient data from the request body
  const clinicInfo = req.body;
  console.log(clinicInfo);

  // Call the 'signupPatient' function to insert the patient data into the database
  signupClinic.signupClinic(
    clinicInfo,
    (error, results) => {
      if (error && error.code == "ER_DUP_ENTRY") {
        res.status(409).send("Clinic already registered!");
      } else if (error) {
        console.log(error);
        res.status(500).send("Error signing up clinic");
      } else {
        res.status(200).send("Clinic signed up successfully");
      }
    },
    connection
  );
});

// Route for clinic signin
app.post('/signinClinic', (req, res) => {
  const { email, password } = req.body;
  connection.query('SELECT * FROM clinics WHERE email = ? AND password = ?', [email, password], (err, result) => {
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
    console.log('Clinic signed in successfully!');

    // Create a JWT token with a payload containing the user ID
    const token = jwt.sign({ userId: result[0].id }, secretKey);

    // Set the token in the response headers
    res.setHeader('Authorization', `Bearer ${token}`);

    // Send a response with the token and any other information you need
    res.status(200).json({
      message: 'Clinic signed in successfully!',
      token: token
    });
  });
});

// Route for customer search
app.get("/clinics", (req, res) => {
  const { clinicName } = req.body;
  connection.query(
    "SELECT * FROM clinics WHERE clinicName LIKE ?",
    `%${clinicName}%`,
    (err, result) => {
      if (err) {
        console.log("Error retrieving clinics from database: " + err);
        res.sendStatus(500);
        return;
      }
      console.log("Clinic retrieved successfully!");
      res.status(200).json(result);
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
