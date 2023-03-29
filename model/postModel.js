const { default: mongoose } = require("mongoose");

require("../db/db");

const PostSchema = mongoose.Schema({
  title: { type: String, unique: true, required: true, max: 25 },
  description: { type: String, required: true },
  timestamps: { type: Date, default: Date.now },
});

module.exports = PostModel = mongoose.model("posts", PostSchema);
