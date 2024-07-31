const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  summary: String,
  content: String,
  cover: String,
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {
    timestamps: true
});

const postModel = mongoose.model("Post", PostSchema);

module.exports = postModel;
