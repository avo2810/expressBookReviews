const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  //Write your code here
  const userName = req.body.username;
  const passWord = req.body.password;
  if (userName && passWord) {
    if (!isValid(userName)) {
      users.push({
        username: userName,
        password: passWord,
      });
      return res
        .status(200)
        .json({ message: "User successfully registred. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  //Write your code here
  //Task 1: done
  // res.send(JSON.stringify({ books }, null, 4));

  //Task 10
  const getAllBooks = new Promise(() => {
    res.send(JSON.stringify({ books }, null, 4));
  });

  getAllBooks.then(() => console.log("Task 10"));
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  //Write your code here
  //Task 2: done
  let ISBN = req.params.isbn;

  res.send(JSON.stringify(books[ISBN]));
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  //Write your code here
  //Task 3: done
  const author = req.params.author;
  let filter_books = Object.values(books).filter(
    (book) => book.author === author
  );
  res.send(filter_books);
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  //Write your code here
  //Task 4: done
  const title = req.params.title;
  let filter_books = Object.values(books).filter(
    (book) => book.title === title
  );
  res.send(filter_books);
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  //Task 5:
  let ISBN = req.params.isbn;

  res.send(JSON.stringify(books[ISBN].reviews));
});

module.exports.general = public_users;
