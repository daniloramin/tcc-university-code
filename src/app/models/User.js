const mongoose = require("mongoose");

const userScheema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 3, maxlength: 30 },
  email: { type: String, required: true, maxlength: 60 },
  password: { type: String, required: true, minlength: 6, maxlength: 200 },
  profilePicture: { type: String, default: "" },
  description: {
    type: String,
    maxlength: 100,
    default: "This is my description",
  },
});

module.exports = mongoose.model("User", userScheema);
