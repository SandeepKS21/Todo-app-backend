const express = require("express");

const post = express.Router();

const PostController = require("../controller/postController");

post.post("/", PostController.create).get("/", PostController.view).delete("/delete/:id", PostController.delete);

exports.post = post;
