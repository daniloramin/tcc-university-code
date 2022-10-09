const Aluno = require("../models/Aluno");

const update = async (req, res) => {
  const { teste, nome, sobrenome, telefone, email_de_contato } = req.body;
  const { _id, hierarquia } = req.body.payload;

  try {
    const verification = await Aluno.findOne({ "conta._id": _id });

    if (!verification) {
      return res.status(400).send({ message: "Usuário não existe." });
    }
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }

  try {
    const aluno = await Aluno.findOneAndUpdate(
      { "conta._id": _id },
      { nome, sobrenome, telefone, email_de_contato },
      { new: true }
    );

    return res.status(200).send({ message: "Aluno atualizado", aluno });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

module.exports = { update };
