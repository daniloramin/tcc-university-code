require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const free = (req, res) => {
  res.status(200).send(`Auth controller and router`);
};

const register = async (req, res) => {
  // console.log(req.body);

  // Vai ser feita uma verificação de login para criar qualquer outra hierarquia alem de aluno
  const { email, senha, hierarquia } = req.body;

  const verification = await User.findOne({ email });
  console.log(verification);

  // Verifica se o email já foi registrado
  if (verification) {
    return res
      .status(400)
      .send({ message: "This email is already registered" });
  }

  // Criptografa a senha, independente de qual seja a hierarquia do usuário
  let hash;
  try {
    const salt = bcrypt.genSaltSync(10);
    hash = bcrypt.hashSync(senha, salt);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }

  const { token } = req.body;

  let payload;
  try {
    payload = jwt.verify(token, process.env.SECRET);
  } catch (err) {}

  if (!payload) {
    try {
      const user = new User({
        email,
        senha: hash,
        hierarquia: "aluno",
      });

      const registered = await user.save();

      return res.status(201).send({
        message: `A new account has been created.`,
        user: registered,
      });
    } catch (err) {
      res.status(400).send({ message: "Ocorreu um erro", error: err.message });
    }
  }

  console.log("token: ", token);

  if (payload.hierarquia !== "adm") {
    return res
      .status(403)
      .send({ message: "Only ADMs can create accounts while logged in" });
  }

  if (payload.hierarquia === "adm") {
    try {
      const user = new User({
        email,
        senha: hash,
        hierarquia,
      });

      const registered = await user.save();
      console.log("Criou uma conta sendo adm");

      return res.status(201).send({
        message: `A new account has been created.`,
        user: registered,
      });
    } catch (err) {
      res.status(400).send({ message: "Ocorreu um erro", error: err.message });
    }
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).send({ message: "Email or password is wrong." });

    if (bcrypt.compareSync(senha, user.senha)) {
      console.log("entrou no if de criar token");
      const token = jwt.sign(
        { _id: user._id, hierarquia: user.hierarquia },
        process.env.SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).send({ message: "Login", data: { user, token } });
    } else {
      res.status(400).send({ message: "Email or password is wrong." });
    }
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

const logout = async (req, res) => {
  res.status(200).send("logout");
};

module.exports = { free, login, register, logout };
