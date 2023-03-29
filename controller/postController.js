const post = require("../model/postModel");
const mongoose = require("mongoose");
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
