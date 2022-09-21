const User = require("../models/User");
const bcrypt = require("bcryptjs");

const free = (req, res) => {
  res.status(200).send(`Auth controller and router`);
};

const register = async (req, res) => {
  // console.log(req.body);
  const { username, email, password, profilePicture, description } = req.body;

  const verification = await User.findOne({ email });

  console.log(verification);

  if (verification) {
    return res
      .status(400)
      .send({ message: "This email is already registered" });
  }

  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = new User({
      username,
      email,
      password: hash,
      profilePicture,
      description,
    });

    const registered = await user.save();

    res
      .status(201)
      .send({ message: `Register router and controller`, user: registered });
  } catch (err) {
    res.status(400).send({ message: "Ocorreu um erro", error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).send({ message: "Email or password is wrong." });

    if (bcrypt.compareSync(password, user.password)) {
      return res.status(200).send({ message: "OK, senha igual" });
    } else {
      res.status(400).send({ message: "Email or password is wrong." });
    }
  } catch (err) {
    return res.status(400).send({ message: err });
  }
};

const logout = async (req, res) => {
  res.status(200).send("logout");
};

module.exports = { free, login, register, logout };
