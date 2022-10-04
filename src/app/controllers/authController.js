require("dotenv").config();
const Aluno = require("../models/Aluno");
const Conta = require("../models/Conta");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const free = (req, res) => {
  res.status(200).send(`Auth controller and router`);
};

const register = async (req, res) => {
  // console.log(req.body);

  // Vai ser feita uma verificação de login para criar qualquer outra hierarquia alem de aluno
  const { email, senha, hierarquia } = req.body;

  const verification = await Conta.findOne({ email });
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

  if (!token) {
    try {
      const conta = new Conta({
        email,
        senha: hash,
        hierarquia: "Aluno",
      });

      const registered = await conta.save();

      return res.status(201).send({
        message: `A new account has been created.`,
        conta: registered,
      });
    } catch (err) {
      res.status(400).send({ message: "Ocorreu um erro", error: err.message });
    }
  }

  if (token.hierarquia !== "adm") {
    return res
      .status(403)
      .send({ message: "Only ADMs can create accounts while logged in" });
  }

  if (token.hierarquia === "adm") {
    try {
      const conta = new Conta({
        email,
        senha: hash,
        hierarquia,
      });

      const registered = await conta.save();

      return res.status(201).send({
        message: `A new account has been created.`,
        conta: registered,
      });
    } catch (err) {
      res.status(400).send({ message: "Ocorreu um erro", error: err.message });
    }
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const conta = await Conta.findOne({ email });

    if (!conta)
      return res.status(400).send({ message: "Email or password is wrong." });

    if (bcrypt.compareSync(password, conta.password)) {
      const token = jwt.sign(
        { _id: conta._id, hierarquia: conta.hierarquia },
        process.env.SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).send({ message: "Login", data: { user, token } });
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
