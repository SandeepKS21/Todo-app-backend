require("./db/db");
require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");

const Route = require("./routes/api");

const app = express();
app.use(express.json());

// User Middleware
const Userauth = (req, res, next) => {
  try {
    const token = req.get("authorization").split("Bearer ")[1];
    var decode = jwt.verify(token, process.env.JWT_KEY);
    // console.log(decode);
    if (decode.id) {
      next();
    } else {
      res.status(401).send("Invalid Token");
    }
  } catch (e) {
    res.status(401).send({ msg: "Invalid Token", code: 401 });
  }
};

app.use("/post", Route.post);
app.use("/", Route.userAuth);

app.use("/user", Userauth, Route.users);

app.listen(process.env.PORT);
