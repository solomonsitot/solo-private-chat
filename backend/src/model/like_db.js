const mongoose = require("mongoose");
const likeSchema = mongoose.Schema({
  poster: {
    id: {
      type: "string",
      required: true,
    },
  },
  liker: {
    id: {
      type: "string",
      required: true,
    },
  },
  posted: {
    id: {
      type: "string",
      required: true,
    },
  },
});
const Likes = new mongoose.model("like", likeSchema);
module.exports = Likes;
