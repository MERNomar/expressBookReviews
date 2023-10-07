const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// books promise since axios cant work with local objects and localhost links 
const booksPromise = new Promise((res , rej) => {res(books)})


// ALL THE AXIOS CODE

//get all bookks 
public_users.get("/axios/", function (req, res) {
  booksPromise.then(e => res.json({e}))
  .catch(err => {res.json({err})})
});

// get a book based on isbn with promise
public_users.get("/axios/isbn/:isbn", function (req, res) {
  const isbn = req.params.isbn
  Object.keys()
  booksPromise.then(e => {
    const ISBNbook = e[isbn]
    res.json({ISBNbook})})
  .catch(err => {res.json({err})})
});


// get all based on author with promises

public_users.get("/axios/author/:author", function (req, res) {
  booksPromise.then(resolveValue => {
    const booksValues = Object.values(resolveValue)
    const filterAuthor = booksValues.filter((author) => author.author == req.params.author);
    if (filterAuthor.length == 0) return  res.status(404).json({ err : "no book in that name" });  
    return res.status(300).json({ filterAuthor });
  })
 .catch(err => {return res.status(300).json({ err });})
});

// get the book based on title 
public_users.get("/axios/title/:title", function (req, res) {
  booksPromise.then(resolveValue => {
    const booksValues = Object.values(resolveValue)
    const filterTitle = booksValues.filter((book) => book.title == req.params.title);
    if (filterTitle.length == 0) return  res.status(404).json({ err : "no book in that name" });  
    return res.status(300).json({ filterTitle });
  })
 .catch(err => {return res.status(300).json({ err });})
});

// finish all axios code





// register a user 
public_users.post("/register", (req, res) => {
  const reqUser = req.body;
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
  const booksValues = Object.values(books)
  const filterAuthor = booksValues.filter((author) => author.author == req.params.author);
  if (filterAuthor.length == 0) return  res.status(404).json({ err : "no book in that name" });  
  return res.status(300).json({ filterAuthor });
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  const booksValues = Object.values(books)
  const filterTitle = booksValues.filter((book) => book.title == req.params.title);
  if (filterTitle.length == 0) return  res.status(404).json({ err : "no book in that name" });  
  return res.status(300).json({ filterTitle });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  const key = Object.keys(books).filter((isbn) => {
    return isbn == req.params.isbn;
  });
  res.json(books[key].reviews);
});

module.exports.general = public_users;

