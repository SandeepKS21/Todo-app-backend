const express = require("express");

const post = express.Router();
const userAuth = express.Router();
const users = express.Router();

const PostController = require("../controller/postController");
const UserAuthController = require("../controller/authController");
const UsersController = require("../controller/userController");

// Post Route
post
  .post("/", PostController.create)
  .get("/", PostController.view)
  .delete("/delete/:id", PostController.delete)
  .put("/update/:id", PostController.update)
  .get("/all", PostController.allPost)
  .post("/like-Post", PostController.likePost)
  .get("/liked/:id", PostController.likedPost);

// User Auth Route
userAuth.post("/register", UserAuthController.register).post("/login", UserAuthController.login);

users.get("/", UsersController.view);

exports.post = post;
exports.userAuth = userAuth;
exports.users = users;
