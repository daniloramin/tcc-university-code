const express = require("express");
const alunoController = require("../controllers/alunoController");

const router = express.Router();

router.post("/updatePersonalData", alunoController.updatePersonalData);

router.get(
  "/getAllInfoByRegistrationNumber",
  alunoController.getAllInfoByRegistrationNumber
);

module.exports = router;
