const mongoose = require("mongoose");
require("../db/db");
const authSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
  token: {
    type: String,
    default: null,
  },
  timestamps: { type: Date, default: Date.now },
});

module.exports = authModel = mongoose.model("users", authSchema);
