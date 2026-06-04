const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  password: String,
  isAdmin: { type: Boolean, default: false }
});

const User = mongoose.model("users", userSchema);

module.exports = User;