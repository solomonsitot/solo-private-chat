const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
  poster: {
    id: {
      type: "string",
      required: true,
    },
  },
  image: {
    type: "string",
    required: true,
  },
  caption: {
    type: "string",
    required: true,
  },
  date: {
    type: "string",
    required: true,
  },
});
const Posts = new mongoose.model("post", postSchema);
module.exports = Posts;
