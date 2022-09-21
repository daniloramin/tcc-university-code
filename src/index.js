require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db/connect");
const configCors = require("./config/cors");
const auth = require("./app/routes/auth");
const user = require("./app/routes/user");

// Connect to db
db();

// Create and configure express app server
const app = express();
app.use(express.json());

// Configure cors and cors whitelist
app.use(cors(configCors()));

// Define all routes the app will use
app.use("/auth", auth);
app.use("/user", user);

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
