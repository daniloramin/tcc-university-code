require("dotenv").config();
const Aluno = require("../models/Aluno");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const free = (req, res) => {
  res.status(200).send(`Auth controller and router`);
};

const register = async (req, res) => {
  // console.log(req.body);

  // Vai ser feita uma verificação de login para criar qualquer outra hierarquia alem de aluno

  const {
    hierarquia,
    nome,
    sobrenome,
    telefone,
    email,
    senha,
    numero_de_registro,
    curso,
    turma,
  } = req.body;

  const verification = await Aluno.findOne({ email });

  console.log(verification);

  if (verification) {
    return res
      .status(400)
      .send({ message: "This email is already registered" });
  }

  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(senha, salt);

    const aluno = new Aluno({
      hierarquia,
      nome,
      sobrenome,
      telefone,
      email,
      senha: hash,
      numero_de_registro,
      curso,
      turma,
    });

    const registered = await aluno.save();

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
    return res.status(400).send({ message: err });
  }
};

const logout = async (req, res) => {
  res.status(200).send("logout");
};

module.exports = { free, login, register, logout };
