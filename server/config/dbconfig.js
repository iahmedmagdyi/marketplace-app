const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://ahmedmagdy:1SPuCnUrPuavPGlR@cluster0.kcam56c.mongodb.net/test"
);
const connection = mongoose.connection;
connection.on("connected", () => {
  console.log("db connected successfully");
});
connection.on("error", () => {
  console.log("db connect failed");
});

module.exports = connection;
