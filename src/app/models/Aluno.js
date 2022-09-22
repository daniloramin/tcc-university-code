const mongoose = require("mongoose");

const alunoSchemma = new mongoose.Schema({
  hierarquia: { type: String, required: true, maxlength: 15 },
  nome: { type: String, required: true, minlength: 3, maxlength: 60 },
  sobrenome: { type: String, required: true, minlength: 3, maxlength: 60 },
  telefone: { type: String, required: true, length: 11 },
  email: { type: String, required: true, maxlength: 60 },
  senha: { type: String, required: true, minlength: 6, maxlength: 200 },
  numero_de_registro: { type: Number, min: 1 },
  curso: { type: String, required: true, minlength: 3, maxlength: 50 },
  turma: { type: String, required: true, length: 4 },
  notas: { type: [{ materia: { type: String }, nota: { type: Number } }] },
});

module.exports = mongoose.model("Aluno", alunoSchemma);
