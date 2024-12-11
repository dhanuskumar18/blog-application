const express = require("express");
const bodyparser = require("body-parser");
const blog = require("../models/blog.js");
const router = express.Router();
const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
let get;

async function fetch(req, res, next) {
  // blog.insertMany([
  //   {
  //     id: "1",
  //     title: "The Rise of Decentralized Finance",
  //     content:
  //       "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
  //     author: "Alex Thompson",
  //     date: "2023-08-01T10:00:00Z",
  //   },
  //   {
  //     id: "2",
  //     title: "The Impact of Artificial Intelligence on Modern Businesses",
  //     content:
  //       "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
  //     author: "Mia Williams",
  //     date: "2023-08-05T14:30:00Z",
  //   },
  //   {
  //     id: "3",
  //     title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
  //     content:
  //       "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
  //     author: "Samuel Green",
  //     date: "2023-08-10T09:15:00Z",
  //   },
  // ])
  get = await blog.find();
  next();
}
async function create(req, res, next) {
  let d = new Date();
  let x = await blog.countDocuments();
  await blog.create({
    id: x + 1,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: d.getFullYear(),
  });
  get = await blog.find();

  next();
}
router.get("/", fetch, (req, res) => {
  res.render("index.ejs", { get });
});
router.get("/new", (req, res) => {
  res.render("modify.ejs", { heading: "New Post", submit: "Create Post" });
});
router.get("/:id", async (req, res) => {
  console.log(typeof(n));
  
  let b = await blog.find({ id: req.params.id });
  console.log(b);

  res.render("modify.ejs", {
    heading: "Edit Post",
    submit: "Update Post",
    get: b,
  });
});
router.post("/create", create, (req, res) => {
  res.redirect("/");
});
router.post("/:id", async (req, res) => {
  let y = new Date();
  await blog.updateOne(
    { id:  req.params.id },
    {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      date: y.getFullYear(),
    }
  );
  res.redirect("/");
});
router.get("/delete/:id", async (req, res) => {
  let id = parseInt(req.params.id);

  await blog.deleteOne({ id: id });
  get = await blog.find();

  res.redirect("/");
});
module.exports = router;
