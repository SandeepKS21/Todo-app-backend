const post = require("../model/postModel");
const mongoose = require("mongoose");

const postLike = require("../model/postLike");
exports.create = async (req, res) => {
  try {
    const data = new post(req.body);

    const result = await data.save();
    console.log(result);

    res.status(201).send({ msg: "success", code: 201, data: result });
  } catch (e) {
    console.log(e);

    if (e instanceof mongoose.Error.ValidationError) {
      const errors = {};
      for (const field in e.errors) {
        errors[field] = e.errors[field].message;
      }
      return res.status(422).send({ msg: "Validation error", code: 422, errors });
    }

    if (e.code == 11000) {
      return res.status(409).send({ msg: "This Title already exists", code: 409 });
    }

    return res.send(e);
    // res.status(500).send({ msg: "internal server error", code: 500 });
  }
};

exports.view = async (req, res) => {
  try {
    // "sort({ timestamps: -1 })"=? means order by date DESC
    const data = await post.find().sort({ timestamps: -1 });

    res.send({ msg: "success", code: 200, data });

    console.log("ok");
  } catch (e) {
    res.status(500).send({ msg: "internal server error", code: 500, data: e });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).send({ msg: "id not found", code: 404 });
  }
  try {
    const data = await post.findByIdAndDelete(id);
    console.log(data);

    if (!data) {
      return res.status(404).send({ msg: "post not found", code: 404 });
    } else {
      res.send({ msg: "post Deleated", code: 200 });
    }
  } catch (e) {
    return res.status(500).send({ msg: "Internal server error", code: 500, data: e });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;

  // check valid id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ msg: "Invalid ID", code: 400 });
  }

  try {
    const data = await post.findByIdAndUpdate(id, { $set: req.body }, { new: true }).lean();
    // console.log(data);

    res.send({ msg: data, code: 200 });
  } catch (e) {
    res.status(500).send({ msg: "Internal server error", code: 500, data: e });
  }
};

// all Posts with users
exports.allPost = async (_req, res) => {
  try {
    const allPost = await post.find().populate("userId", "name");
    res.send({ msg: "success", code: 200, data: allPost });
  } catch (e) {
    res.status(500).send({ msg: "Internal server error", code: 500 });
  }
};

// Like a post
exports.likePost = async (req, res) => {
  try {
    const { userId } = req.body;
    const { postId } = req.body;

    const data = new postLike({
      userId: userId,
      postId: postId,
    });

    const result = await data.save();

    res.send({ msg: "Post Liked Successfully", code: 200 });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      const error = {};
      for (const key in e.errors) {
        error[key] = e.errors[key].message;
        console.log(error);
      }
      return res.status(500).send({ msg: "Validation Error", code: 500, data: error });
    }

    return res.status(500).send({ msg: "Internal server error", code: 500 });
  }
};

// show users all liked post
exports.likedPost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ msg: "Invalid ID", code: 400 });
  }
  try {
    const posts = await post.find();

    // res.send({ msg: "success", code: 200, data: posts });

    for (i = 0; i < posts.length; i++) {
      // console.log(posts[i]._id.toString())
      var likedPost = await postLike.findOne({
        userId: id,
        postId: posts[i]._id.toString(),
      });
      // likedPost.push(...likedPost);
    }

    console.log(likedPost);

    return res.send({ msg: "success", code: 200, data: posts });
  } catch (e) {
    return res.status(500).send({ msg: "Internal server error", code: 500 });
  }
};
