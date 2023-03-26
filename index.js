require("./db/db");
require("dotenv").config();
const express = require("express");

const Route = require("./routes/api");

const app = express();
app.use(express.json());



app.use("/post", Route.post);

app.listen(process.env.PORT);
