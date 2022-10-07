const mongoose = require("mongoose");

const userSchemma = mongoose.Schema({
  email: { type: String, required: true, maxlength: 60 },
  senha: { type: String, required: true, minlength: 6, maxlength: 200 },
  hierarquia: { type: String, required: true, maxlength: 15 },
});

module.exports = mongoose.model("User", userSchemma);
