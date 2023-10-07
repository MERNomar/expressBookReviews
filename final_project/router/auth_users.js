const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
 {username :"omar"},
 {username :"ahmed"}
];

 // I created it to return error Object instead of boolean to track the error better
const isValid = (body) => {
  let errorData = { err: "" };
  if (!body.username || !body.password) {
    return (errorData.err = "data is invalid");
  } else {
    if (body.username.length < 5 || body.password.length < 5) {
      return (errorData.err = "password or username is too short");
    } else {
      users.filter(({ username }) => {
        if (username === body.username) {
         return errorData.err = "dublicate";
        }
      });
    }
  }
  if (errorData.err){return errorData;}else{
    console.log(errorData.err)
     users.push(body);
     return "user is created successfully"
  }
 };


const authenticatedUser = (username,password)=>{ 
  let boo = false;
  users.filter((user) => {
    if (user.username === username && user.password === password){boo = true}
  })
  return boo

}

const createToken = (username) => {
  return jwt.sign({ user: username }, "omar ahmed something");
};

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  let msg = "user is invalid";
  const username = req.body.username
  const password = req.body.password
  const validUser = authenticatedUser(username , password)
  if (validUser){
    const token = createToken(username)
    req.session.userId = token; 
    msg = "Customer successfully logged in "
    return res.status(300).send( token );
  }else {return res.status(404).send( "username or password is invalid" ); }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const review = req.body.review;
  const isbn = req.params.isbn;
  let reviews =  books[isbn].reviews
  const username = jwt.decode(req.session.userId , 'omar ahmed something')
  const user = username.user
  if (review === "" || isbn === "") return res.status(404).send("please enter a review and isbn code")
  
   //res.status(300).send(`your review has been updated/added to isbn code ${isbn}`);
   reviews[user] = review
   res.json({books})
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  let reviews =  books[isbn].reviews
  const username = jwt.decode(req.session.userId , 'omar ahmed something')
  const user = username.user
  if (!reviews[user]) return res.status(404).send("this user have no reviews")
  
   //res.status(300).send(`your review has been updated/added to isbn code ${isbn}`);
   res.status(300).send(`Review for ISBN ${isbn} posted by the user ${user}`)
   delete reviews[user]
  
})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
