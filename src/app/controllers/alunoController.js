const Aluno = require("../models/Aluno");

const updatePersonalData = async (req, res) => {
  const { teste, nome, sobrenome, telefone, email_de_contato } = req.body;
  const { _id, hierarquia } = req.body.payload;

  if (hierarquia === "professor") {
    return res.status(403).send({ message: "Acesso proibido. " });
  }

  //if (!matriculado) return error

  try {
    const verification = await Aluno.findOne({ "conta._id": _id });

    if (!verification) {
      return res.status(400).send({ message: "Usuário não existe." });
    }

    if (!verification.matriculado) {
      return res.status(400).send({
        message: "Usuário não tem permissão pois ainda não está matriculado. ",
      });
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

    return res.status(200).send({
      message: "Aluno atualizado.",
      aluno: {
        nome: aluno.nome,
        sobrenome: aluno.sobrenome,
        telefone: aluno.telefone,
        email_de_contato: aluno.email_de_contato,
      },
    });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

// const updateCourseData = async (req, res) => {
//   const { curso, turma, matriculado } = req.body;
// };

const getAllInfoByRegistrationNumber = async (req, res) => {
  const { numero_de_registro } = req.body;
  const { _id, hierarquia } = req.body.payload;

  if (hierarquia === "professor") {
    return res.status(403).send({ message: "Acesso proibido." });
  }

  console.log(`Numero de registro: ${numero_de_registro}`);
  console.log(`ID: ${_id}`);

  try {
    const aluno = await Aluno.findOne({
      "conta._id": _id,
      numero_de_registro,
    });

    if (!aluno) {
      return res.status(400).send({
        message:
          "Somente o aluno com esse número de registro pode solicitar as informações.",
      });
    }

    return res.status(200).send({
      message: "Ok",
      datas: {
        email_de_contato: aluno.email_de_contato,
        nome: aluno.nome,
        sobrenome: aluno.sobrenome,
        telefone: aluno.telefone,
        numero_de_registro: aluno.numero_de_registro,
        curso: aluno.curso,
        turma: aluno.turma,
        notas: aluno.notas.map((n) => {
          return n.map((e) => {
            return { materia: e.materia, nota: e.nota };
          });
        }),
        matriculado: aluno.matriculado,
      },
    });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

module.exports = {
  updatePersonalData,
  updateCourseData,
  getAllInfoByRegistrationNumber /*, getContactInfoByRegistrationNumber, getCourseInfoByRegistrationNumber */,
};
