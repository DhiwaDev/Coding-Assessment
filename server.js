const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const app = express();
const axios = require("axios");

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Create a connection to the database

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "neoproj",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to MySQL database...");
});

//get data from challenges table

app.get("/api/challenges", (req, res) => {
  const sql = "SELECT * FROM challenges";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

//get data from questions table

app.get("/api/questions/:challenges_id", (req, res) => {
  const sql = "SELECT * FROM questions WHERE challenges_id = ?";
  const challenges_id = req.params.challenges_id;
  db.query(sql, [challenges_id], (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

app.get("/api/questions/:challenges_id/:difficulty", (req, res) => {
  const sql =
    "SELECT * FROM questions WHERE challenges_id = ? AND difficulty = ?";
  const challenges_id = req.params.challenges_id;
  const difficulty = req.params.difficulty;
  db.query(sql, [challenges_id, difficulty], (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});


//get data from questions description table

app.get("/api/question-description/:question_id", (req, res) => {
  const questionSql =
    "SELECT q.*, t.input, t.expected_output FROM question_description q JOIN testcases t ON q.question_id = t.question_id WHERE q.question_id = ?";
  const question_id = req.params.question_id;
  db.query(questionSql, [question_id], (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});



//get data from contest_details table

app.get("/api/contestdetails", (req, res) => {
  const sql = "SELECT * FROM contest_details";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});



//get data from contest_list table
app.get("/api/contestlist/:contest_id", (req, res) => {
  const sql = "SELECT * FROM contest_list WHERE contest_id = ?";
  const contest_id = req.params.contest_id;
  db.query(sql, [contest_id], (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});


app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;

  // Check if all required fields are present
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Generate a salt to be used for hashing
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      console.error("Error generating salt:", err);
      return res.status(500).json({ message: "Registration failed" });
    }

    // Hash the password using the generated salt
    bcrypt.hash(password, salt, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).json({ message: "Registration failed" });
      }

      // Store the registration data in the database
      const query = `INSERT INTO login (name, email, password) VALUES (?, ?, ?)`;
      db.query(query, [name, email, hashedPassword], (error, results) => {
        if (error) {
          console.error("Error storing registration data:", error);
          return res.status(500).json({ message: "Registration failed" });
        } else {
          return res.json({ message: "Registration successful" });
        }
      });
    });
  });
});



//login authentication and check the email and password from the login(register) table
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // Query the registration table to retrieve the user with the provided email
  const query = `SELECT * FROM login WHERE email = ?`;
  db.query(query, [email], (error, results) => {
    if (error) {
      console.error("Error querying registration table:", error);
      return res.status(500).json({ message: "Login failed" });
    }

    // Check if a user with the provided email exists
    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Retrieve the stored hashed password from the registration table
    const hashedPassword = results[0].password;

    // Compare the provided password with the stored hashed password
    bcrypt.compare(password, hashedPassword, (error, isMatch) => {
      if (error) {
        console.error("Error comparing passwords:", error);
        return res.status(500).json({ message: "Login failed" });
      }

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Passwords match, authentication successful
     res.json({
       message: "Login successful",
       name: results[0].name,
       email: results[0].email,
     });

    });
  });
});

app.get("/api/runCodeJava", async (req, res) => {
  const code = req.query.code; // Get the code from the query parameters
  const language = 'java';

  // const name = req.query.name || localStorage.getItem("name");

  try {
    // Make the JDoodle Compiler API call
    const response = await axios.post("https://api.jdoodle.com/v1/execute", {
      clientId: "bd03006ffe3102ad691b556ab5adc348",
      clientSecret:
        "a80cfb1edd512be0079872d14a36044a6d24753b2fd3a2dfc3d0bf89ac9d8087",
      script: code,
      language: language, // Change the language according to your needs
      versionIndex: 3,
    });
    const submission = {
      // profile_name: name,
      code: code,
      language: language,
      timestamp: new Date(),
    };

    db.query("INSERT INTO submission SET ?", submission, (err, result) => {
      if (err) {
        console.error("Error saving code in the database:", err);
        res.status(500).json({ message: "Error saving code in the database" });
      } else {
        res.json(response.data); // Return the response from the JDoodle Compiler API
      }
    });
  } catch (error) {
    console.error("Error executing code:", error);
    res.status(500).json({ message: "Error executing code" });
  }
});


app.get("/api/runCodeC", async (req, res) => {
  const code = req.query.code; // Get the code from the query parameters
  const language = 'c';

  // const name = req.query.name || localStorage.getItem("name");
  try {
    // Make the JDoodle Compiler API call
    const response = await axios.post("https://api.jdoodle.com/v1/execute", {
      clientId: "bd03006ffe3102ad691b556ab5adc348",
      clientSecret: "a80cfb1edd512be0079872d14a36044a6d24753b2fd3a2dfc3d0bf89ac9d8087",
      script: code,
      language: language, // Change the language according to your needs
      versionIndex: 4,
    });
    const submission = {
      // profile_name: name,
      code: code,
      language: language,
      timestamp: new Date(),
    };

    db.query("INSERT INTO submission SET ?", submission, (err, result) => {
      if (err) {
        console.error("Error saving code in the database:", err);
        res.status(500).json({ message: "Error saving code in the database" });
      } else {
        res.json(response.data); // Return the response from the JDoodle Compiler API
      }
    });
  } catch (error) {
    console.error("Error executing code:", error);
    res.status(500).json({ message: "Error executing code" });
  }
});


app.get("/api/runCodeCpp", async (req, res) => {
  const code = req.query.code; // Get the code from the query parameters
  const language = 'cpp';

  try {
    // Make the JDoodle Compiler API call
    const response = await axios.post("https://api.jdoodle.com/v1/execute", {
      clientId: "bd03006ffe3102ad691b556ab5adc348",
      clientSecret:
        "a80cfb1edd512be0079872d14a36044a6d24753b2fd3a2dfc3d0bf89ac9d8087",
      script: code,
      language: language, // Change the language according to your needs
      versionIndex: 5,
    });
    const submission = {
      code: code,
      language: language,
      timestamp: new Date(),
    };

    db.query("INSERT INTO submission SET ?", submission, (err, result) => {
      if (err) {
        console.error("Error saving code in the database:", err);
        res.status(500).json({ message: "Error saving code in the database" });
      } else {
        res.json(response.data); // Return the response from the JDoodle Compiler API
      }
    });
  } catch (error) {
    console.error("Error executing code:", error);
    res.status(500).json({ message: "Error executing code" });
  }
});

app.get("/api/submission", (req, res) => {
  const sql = "SELECT * FROM submission";
  const contest_id = req.params.contest_id;
  db.query(sql, [contest_id], (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}...`));
