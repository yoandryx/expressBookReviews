const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');


public_users.post("/register", (req,res) => {
 const { username, password } = req.body; // Retrieve username and password from request body

  // Check if both username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  // Check if the username already exists
  if (users.find(user => user.username === username)) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Register the new user
  users.push({ username, password });
  return res.status(201).json({ message: "User registered successfully" });
});

// Get the book list available in the shop
public_users.get('/', async (req, res) => {
    try {
        // Simulating an asynchronous operation (e.g., fetching from an API or database)
        const response = await new Promise((resolve) => {
            setTimeout(() => resolve(books), 1000); // Simulating delay
        });

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving books list" });
    }
});

// Get the book list available in the shop using Promises
public_users.get('/promise', (req, res) => {
    new Promise((resolve, reject) => {
        setTimeout(() => {
            if (books) resolve(books);
            else reject("Error retrieving books list");
        }, 1000);
    })
    .then(response => res.status(200).json(response))
    .catch(error => res.status(500).json({ message: error }));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
    const isbn = req.params.isbn;

    try {
        // Simulating an asynchronous operation (e.g., fetching from an API or database)
        const response = await new Promise((resolve, reject) => {
            setTimeout(() => {
                if (books[isbn]) resolve(books[isbn]);
                else reject("Book not found");
            }, 1000);
        });

        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({ message: error });
    }
});

// Get book details based on ISBN using Promises
public_users.get('/promise/isbn/:isbn', (req, res) => {
    const isbn = req.params.isbn;

    new Promise((resolve, reject) => {
        setTimeout(() => {
            if (books[isbn]) resolve(books[isbn]);
            else reject("Book not found");
        }, 1000);
    })
    .then(response => res.status(200).json(response))
    .catch(error => res.status(404).json({ message: error }));
});
  
// Get book details based on author
public_users.get('/author/:author', async (req, res) => {
    const author = req.params.author.toLowerCase();

    try {
        // Simulating an asynchronous operation (e.g., fetching from an API or database)
        const response = await new Promise((resolve, reject) => {
            setTimeout(() => {
                const filteredBooks = Object.values(books).filter(book => book.author.toLowerCase() === author);
                if (filteredBooks.length > 0) resolve(filteredBooks);
                else reject("No books found for this author");
            }, 1000);
        });

        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({ message: error });
    }
});

// Get book details based on Author using Promises
public_users.get('/promise/author/:author', (req, res) => {
    const author = req.params.author.toLowerCase();

    new Promise((resolve, reject) => {
        setTimeout(() => {
            const filteredBooks = Object.values(books).filter(book => book.author.toLowerCase() === author);
            if (filteredBooks.length > 0) resolve(filteredBooks);
            else reject("No books found for this author");
        }, 1000);
    })
    .then(response => res.status(200).json(response))
    .catch(error => res.status(404).json({ message: error }));
});

// Get all books based on title
public_users.get('/title/:title', async (req, res) => {
    const title = req.params.title.toLowerCase();

    try {
        // Simulating an asynchronous operation (e.g., fetching from an API or database)
        const response = await new Promise((resolve, reject) => {
            setTimeout(() => {
                const filteredBooks = Object.values(books).filter(book => book.title.toLowerCase() === title);
                if (filteredBooks.length > 0) resolve(filteredBooks);
                else reject("No books found with this title");
            }, 1000);
        });

        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({ message: error });
    }
});

// Get book details based on Title using Promises
public_users.get('/promise/title/:title', (req, res) => {
    const title = req.params.title.toLowerCase();

    new Promise((resolve, reject) => {
        setTimeout(() => {
            const filteredBooks = Object.values(books).filter(book => book.title.toLowerCase() === title);
            if (filteredBooks.length > 0) resolve(filteredBooks);
            else reject("No books found with this title");
        }, 1000);
    })
    .then(response => res.status(200).json(response))
    .catch(error => res.status(404).json({ message: error }));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn; // Retrieve ISBN from request parameters
  const book = books[isbn]; // Find book by ISBN

  if (book && book.reviews) {
    return res.status(200).json(book.reviews);
  } else {
    return res.status(404).json({ message: "No reviews found for this book" });
  }
});

module.exports.general = public_users;
