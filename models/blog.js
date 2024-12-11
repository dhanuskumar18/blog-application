const mongoose = require("mongoose");
const { type } = require("os");
const { title } = require("process");
const userschema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports=mongoose.model("blog",userschema);
