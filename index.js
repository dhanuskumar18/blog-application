const express = require("express");
const bodyparser = require("body-parser");
const routes=require("./routes/routes.js")
const { default: mongoose } = require("mongoose");
const { error, log } = require("console");
const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));

const url = "mongodb+srv://dhanuskumar18:5oUyxhBnuLoiLX71@learnhub.py5qs.mongodb.net/blogapp?retryWrites=true&w=majority&appName=LearnHub";

mongoose
  .connect(url)
  .then(() => {
    console.log(" DB connection successfull");
  })
  .catch((error) => {
    console.log(error);
  });
  
  
app.use("/",routes)
app.listen(8000,()=>{
    console.log("sever connected");
    
})
