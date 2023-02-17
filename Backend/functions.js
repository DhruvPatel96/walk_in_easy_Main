function signupPatient(patientInfo, callback, connection) {
  // Extract patient data from the request body
  const {
    fullName,
    email,
    phoneNumber,
    password,
    age,
    streetAddress,
    city,
    province,
    zipCode,
    country,
    gender,
    dateOfBirth
  } = patientInfo;

  // Construct a SQL query to insert the patient data into the 'patients' table
  const sql = `INSERT INTO patients (fullName, email, phoneNumber, password, age, streetAddress, city, province, zipCode, country, gender, dateOfBirth)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  // Execute the query with the patient data as parameters
  connection.query(sql, [fullName, email, phoneNumber, password, age, streetAddress, city, province, zipCode, country, gender, dateOfBirth], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

module.exports = {
  signupPatient: signupPatient
};

