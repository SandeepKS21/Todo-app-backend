const { default: mongoose, Mongoose } = require("mongoose");

require("../db/db");

const likePostSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
});

module.exports = likePostModel = mongoose.model("liked_post", likePostSchema);
