const Aluno = require("../models/Aluno");

const update = async (req, res) => {
  const { teste, nome, sobrenome, telefone, email_de_contato } = req.body;
  const { _id, hierarquia } = req.body.payload;
  console.log("teste: ", teste);

  const verification = await Aluno.findOne({ teste });
  console.log("verification: ", verification);

  if (!verification) {
    return res.status(400).send({ message: "Usuário não existe." });
  }

  return res.status(200).send({ message: "Aluno encontrado." });
};

module.exports = { update };
