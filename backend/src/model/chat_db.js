const mongoose = require("mongoose");
const chatSchema = mongoose.Schema({
  sender: {
    id: {
      type: "string",
      required: true,
    },
  },
  receiver: {
    id: {
      type: "string",
      required: true,
    },
  },
  chat: {
    type: "string",
    required: true,
  },
  time: {
    type: "string",
    required: true,
  },
});
const Chats = new mongoose.model("chat", chatSchema);
module.exports = Chats;
