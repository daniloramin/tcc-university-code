const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(process.env.DB_URL);
  const db = mongoose.connection;
  db.once("open", () => {
    console.log(`DB Open.`);
  });
};
