const express = require("express");
const alunoController = require("../controllers/alunoController");

const router = express.Router();

router.post("/update", alunoController.update);

router.get(
  "/getAllInfoByRegistrationNumber",
  alunoController.getAllInfoByRegistrationNumber
);

module.exports = router;
