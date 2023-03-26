const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://sks:JT1buM1RcD8mThIK@cluster0.z1motjr.mongodb.net/todoApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  //   .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error(error));
