const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const userModel = require("./models/UserModel");
const postModel = require("./models/PostModel");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const seceretKey = "asfsrfeds4gterdtru7tyhukgkjhkjk";
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());
const port = 3000
const salt = bcrypt.genSaltSync(10);

mongoose.connect(
  "mongodb+srv://admin30:admin30@cluster01.5zrbzjy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster01"
);

app.post("/register", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const userDoc = await userModel.create({
      userName,
      password: bcrypt.hashSync(password, salt),
    });
    res.status(501).json(userDoc);
  } catch (error) {
    res.status(400).json(error.errmsg);
  }
});

app.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  const userDoc = await userModel.findOne({ userName: userName });
  const isPassCorrect = bcrypt.compareSync(password, userDoc.password);
  if (isPassCorrect) {
    jwt.sign({ userName, id: userDoc._id }, seceretKey, {}, (err, token) => {
      if (err) throw err;
      res
        .cookie("token", token)
        .status(200)
        .json({ id: userDoc._id, userName });
    });
  } else {
    res.status(400).json("Wrong Credentials");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  console.log(token);
  jwt.verify(token, seceretKey, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
  res.json(req.cookies);
});



app.post("/posts", upload.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const temp = originalname.split(".");
  const extension = temp[temp.length - 1];
  const newFilePath = path + "." + extension;
  fs.renameSync(path, newFilePath);

  const { token } = req.cookies;

  jwt.verify(token, seceretKey, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const newPost = await postModel.create({
      title,
      summary,
      content,
      cover: newFilePath,
      author: info.id,
    });
    res.status(200).json(newPost);
  });
});

app.get("/posts/:id", async (req, res) => {
  const {id} = req.params;
  const postDocThroughId = await postModel.findById(id).populate("author")
  res.json(postDocThroughId)
});

app.get("/posts", async (req, res) => {
  const posts = await postModel
    .find()
    .populate("author")
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(posts);
});

app.post("/logOut", (req, res) => {
  res.cookie("token", "").json("OK");
});

app.listen(port);
