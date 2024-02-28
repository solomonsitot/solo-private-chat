const mongoose = require("mongoose");
const commentSchema = mongoose.Schema({
  poster: {
    id: {
      type: "string",
      required: true,
    },
  },
  commenter: {
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
  comment_string: {
    type: "string",
    required: true,
  },
});
const Comments = new mongoose.model("comment", commentSchema);
module.exports = Comments;
