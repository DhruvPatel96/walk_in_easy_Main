function signupPatient(patientInfo, callback) {
  // Extract patient data from the request body
  const {
    id,
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
  const sql = `INSERT INTO patients (id, fullName, email, phoneNumber, password, age, streetAddress, city, province, zipCode, country, gender, dateOfBirth)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  // Execute the query with the patient data as parameters
  connection.query(sql, [id, fullName, email, phoneNumber, password, age, streetAddress, city, province, zipCode, country, gender, dateOfBirth], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}