const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Auth = require("../model/AuthModel");

exports.register = async (req, res) => {
  try {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const data = new Auth({
      name: req.body.name,
      password: hashedPassword,
    });

    const result = await data.save();
    console.log(result);
    // res.status(201).send({ result });
    res.send({ msg: "Registered successful", code: 200 });
  } catch (e) {
    if ((e.code = 1100)) {
      return res.status(400).send({ msg: "name already exists", code: 400 });
    }

    res.status(500).send({ msg: "Server error", code: 500 });
  }
};

exports.login = async (req, res) => {
  const user = await Auth.findOne({ name: req.body.name });

  if (!user) {
    return res.status(400).send({ msg: "User not found", code: 400 });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    return res.status(400).send({ msg: "Wrong Password", code: 400 });
  }
  try {
    const token = jwt.sign({ name: req.body.name }, process.env.JWT_KEY);

    user.token = token;

    await user.save();

    console.log(user);

    res.send({ msg: "success", code: 200, data: { token: user.token } });
  } catch (e) {
    return res.status(500).send({ msg: "Server error", code: 500 });
  }
};
