const express = require("express");

const post = express.Router();

const userAuth = express.Router();
const PostController = require("../controller/postController");
const UserAuthController = require("../controller/authController");

post
  .post("/", PostController.create)
  .get("/", PostController.view)
  .delete("/delete/:id", PostController.delete)
  .put("/update/:id", PostController.update);

userAuth.post("/register", UserAuthController.register).post("/login", UserAuthController.login);

exports.post = post;
exports.userAuth = userAuth;
