const express = require('express');
let books = require("./booksdb.js");
const { JsonWebTokenError } = require('jsonwebtoken');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
    const username = req.body.username;
    const password = req.body.password;

   // Check if username and password are provided
   if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
}
const userExists = users.find(user => user.username === username);
    if (userExists) {
        return res.status(409).json({ message: 'Username already exists' });
    }

    // If the username is unique, register the user
    const newUser = { username, password };
    users.push(newUser);
    return res.status(201).json({ message: 'User registered successfully', user: newUser });
});


   


// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  let list_of_books = books;
  res.send(JSON.stringify(list_of_books, null, 4));

  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  if (books[isbn]) {
    res.status(200).json(books[isbn]);  // Return the book details as JSON
  } else {
    res.status(404).json({ message: 'Book not found' });  // If the ISBN is not found
  }
 
  
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  let booksByAuthor = Object.values(books).filter(book => book.author.toLowerCase() === author.toLowerCase());

  // Check if there are any books by this author
  if (booksByAuthor.length > 0) {
    res.status(200).json(booksByAuthor);  // Return the list of books by the author as JSON
  } else {
    res.status(404).json({ message: 'No books found for this author' });  // If no books found
  }
 });

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;

  let booksBytitle = Object.values(books).filter(book => book.title.toLowerCase() === title.toLowerCase());

  // Check if there are any books by this author
  if (booksBytitle.length > 0) {
    res.status(200).json(booksBytitle);  // Return the list of books by the author as JSON
  } else {
    res.status(404).json({ message: 'No books found for this title' });  // If no books found
  }
 
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;  // Retrieve ISBN from the request parameters
  
    // Check if the book exists with the given ISBN
    if (books[isbn]) {
      // Check if there are any reviews for the book
      const bookReviews = books[isbn].reviews;
      if (bookReviews && bookReviews.length > 0) {
        res.status(200).json(bookReviews);  // Return the book's reviews as JSON
      } else {
        res.status(404).json({ message: 'No reviews found for this book.' });  // No reviews for the book
      }
    } else {
      res.status(404).json({ message: 'Book not found with the provided ISBN.' });  // If ISBN does not exist
    }
  });

module.exports.general = public_users;
