const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const user = require("../model/AuthModel");

exports.view = async (req, res) => {
  const token = req.get("authorization").split("Bearer ")[1];
  var decode = jwt.verify(token, process.env.JWT_KEY);
  const id = decode.id;
  try {
    const data = await user.findOne({ _id: id }, { _id: 0, password: 0 });
    if (!data.image) {
      data.image =
        "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png";
    }

    res.send({ msg: "success", code: 200, data: data });
  } catch (e) {
    return res.status({ msg: "Server error", code: 500 });
  }
};
