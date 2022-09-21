const express = require("express");
const userCOntroller = require("../controllers/userController");

const router = express.Router();

router.put("/updateAccount", userCOntroller.updateAccount);

module.exports = router;
