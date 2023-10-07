const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  const reqUser = req.body;
  //? switch statement to make things more easy
 let pushState = isValid(reqUser)
  res.status(300).json({pushState });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  //Write your code here
  return res.status(300).json(books);
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  const key = Object.keys(books).filter((isbn) => {
    return isbn == req.params.isbn;
  });
  res.json(books[key]);
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  let authorResult = [];
  const key = Object.values(books).filter((author) => {
    if (author.author == req.params.author) {
      authorResult.push(author);
    }
  });

  return res.status(300).json({ authorResult });
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  let titleResult = [];
  const key = Object.values(books).filter((title) => {
    if (title.title == req.params.title) {
      titleResult.push(title);
    }
  });

  return res.status(300).json({ titleResult });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  const key = Object.keys(books).filter((isbn) => {
    return isbn == req.params.isbn;
  });
  res.json(books[key].reviews);
});

module.exports.general = public_users;
