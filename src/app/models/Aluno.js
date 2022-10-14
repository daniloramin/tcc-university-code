const mongoose = require("mongoose");

const alunoSchemma = new mongoose.Schema({
  nome: { type: String, required: true, minlength: 3, maxlength: 60 },
  sobrenome: { type: String, required: true, minlength: 3, maxlength: 60 },
  telefone: { type: String, required: true, length: 11 },
  email_de_contato: { type: String, required: true, maxlength: 60 },
  numero_de_registro: { type: Number, min: 1 },
  curso: { type: String, minlength: 3, maxlength: 50 },
  turma: { type: String, length: 4 },
  notas: { type: [[{ materia: { type: String }, nota: { type: Number } }]] },
  conta: { _id: { type: mongoose.Schema.Types.ObjectId } },
  matriculado: { type: Boolean, required: true },
});

module.exports = mongoose.model("Aluno", alunoSchemma);
