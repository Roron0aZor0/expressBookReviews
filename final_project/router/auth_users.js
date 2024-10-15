const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
 // Check if username is not empty
 if (!username || username.trim().length === 0) {
    return false;
}

// Check if the username contains only alphanumeric characters
const validUsernameRegex = /^[a-zA-Z0-9]+$/;

// Test the username with the regex and return the result
return validUsernameRegex.test(username);
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
// Check if the username exists in the records
if (users[username]) {
    // Check if the provided password matches the stored password
    return users[username] === password;
}
// If username does not exist or password does not match, return false
return false;
}

//only registered users can login
regd_users.post("login", (req,res) => {
  //Write your code here
  const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    // Check if the user is authenticated
    if (authenticatedUser(username, password)) {
        // Create a JWT token (use a secret key in production)
        const token = jwt.sign({ username }, 'your_secret_key', { expiresIn: '1h' });

        // Send the token back to the client
        return res.json({ message: "Login successful!", token });
    } else {
        return res.status(401).json({ message: "Invalid username or password." });
    }
  });


// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
