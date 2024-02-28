const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/chat");
const cors = require("cors");
const User = require("./src/model/user_db");
const Chats = require("./src/model/chat_db");
const Posts = require("./src/model/post_db");
const Likes = require("./src/model/like_db");
const Comments = require("./src/model/comment_db");
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  "/posts",
  express.static(path.join(__dirname, "src", "public", "posts"))
);

const poststorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/public/posts");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_post_" + file.originalname);
  },
});

const uploadpost = multer({ storage: poststorage });

app.post("/users/register", async (req, res) => {
  try {
    const { name, password, username } = req.body;
    const newUser = {
      name: name,
      password: password,
      username: username,
    };
    const newuser = await User.create(newUser);
    res.send(newuser._id).status(200);
  } catch (err) {
    console.log(err);
  }
});

app.get("/users/login/:password/:username", async (req, res) => {
  try {
    const { password, username } = req.params;
    const legituser = await User.findOne({
      username: username,
      password: password,
    });

    if (!legituser) {
      res.status(401).send({});
    } else {
      // If user is found, send 'pass'
      res.status(200).send(legituser);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/users/myinfo/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);
    const myinfo = await User.findOne({ _id: id });
    await res.send(myinfo);
  } catch (err) {
    console.log(err);
  }
});

app.get("/users/getAll/:id", async (req, res) => {
  const id = req.params.id;
  const AllUsers = await User.find({ _id: { $ne: id } });
  res.send(AllUsers).status(200);
});

app.get("/users/getuser/:rid", async (req, res) => {
  const id = req.params.rid;

  const Userinfo = await User.find({ _id: id });
  res.send(Userinfo).status(200);
});
app.get("/chats/chatbn/:rid/and/:sid", async (req, res) => {
  const rid = req.params.rid;
  const sid = req.params.sid;
  const userallchat = await Chats.find({
    $or: [
      { $and: [{ "receiver.id": rid }, { "sender.id": sid }] },
      { $and: [{ "receiver.id": sid }, { "sender.id": rid }] },
    ],
  });
  res.send(userallchat).status(200);
});

app.post("/chats/chatbn/:sid/to/:rid", async (req, res) => {
  try {
    const rid = req.params.rid;
    const sid = req.params.sid;
    const message = req.body.message;
    const timeString = req.body.timeString;
    const Userchat = {
      sender: {
        id: sid,
      },
      receiver: {
        id: rid,
      },
      chat: message,
      time: timeString,
    };
    await Chats.create(Userchat);
    res.status(200).json({ message: "message sent successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/posts/newpost", uploadpost.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image provided" });
    }

    const caption = req.body.caption;
    const id = req.body.id;
    const date = req.body.date;
    const postname = req.file.filename;

    console.log(postname);
    const newpost = {
      poster: {
        id: id,
      },
      image: postname,
      caption: caption,
      date: date,
    };

    await Posts.create(newpost);
    res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/posts/getAll", async (req, res) => {
  const allposts = await Posts.find({});
  res.send(allposts).status(200);
});
app.get("/posts/mine/:id", async (req, res) => {
  const id = req.params.id;
  const myposts = await Posts.find({"poster.id": id});
  res.status(200).send(myposts);
});


app.post("/likes/of/:postid", async (req, res) => {
  try {
    const postid = req.params.postid;
    const posterid = req.body.posterid;
    const likerid = req.body.id;

    const newlike = {
      poster: {
        id: posterid,
      },
      liker: {
        id: likerid,
      },
      posted: {
        id: postid,
      },
    };
    await Likes.create(newlike);
    res.status(200).json({ message: "message sent successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/likes/remove/of/:postid", async (req, res) => {
  try {
    const postid = req.params.postid;
    const posterid = req.body.posterid;
    const likerid = req.body.id;

    const removedlike = await Likes.findOneAndDelete({
      $and: [
        { "poster.id": posterid },
        { "posted.id": postid },
        { "liker.id": likerid },
      ],
    });

    res.status(200).json({ message: "message sent successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/likes/likedby/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // const PostedIds = await Likes.distinct("posted.id");
    // const likerId = await Likes.distinct("liker.id");

    const PostedIds = await Likes.distinct("posted.id", { "liker.id": id });
    // const likerId = await Likes.distinct("liker.id", { "user.id": id });

    res.status(200).send( PostedIds);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
// const port = process.env.PORT||6000;
// app.listen((6000),
//   console.log(`listening on 6000`)
// )
