const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", authController.free);

router.get("/logout", authController.logout);

router.post("/register", authController.register);
router.post("/login", authController.login);

// router.delete("/deleteAccount", authController.deleteAccount);

module.exports = router;
