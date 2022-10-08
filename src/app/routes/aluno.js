const express = require("express");
const alunoController = require("../controllers/alunoController");

const router = express.Router();

router.post("/update", alunoController.update);

module.exports = router;
