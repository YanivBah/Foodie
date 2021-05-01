const Comment = require("../model/comment");

const addComment = async (req, res) => {
  try {
    const comments = await Comment.findById(req.recipe.comments);
    const comment = {
      user: req.user._id,
      content: req.body.content
    }
    comments.comments.push(comment);
    await comments.save();
    res.status(201).send(comment);
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = { addComment };