const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
  username: {
    type: "string",
    required: true,
  },
});
const User = new mongoose.model("User", userSchema);
module.exports = User;
