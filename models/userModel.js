const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [4, "Title should be minimum of 4 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password should be minimum of 8 characters"],
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
