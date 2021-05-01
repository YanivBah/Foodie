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
    res.status(201).send(comments.comments[comments.comments.length-1]);
  } catch (e) {
    res.status(400).send(e);
  }
};

const editComment = async (req, res) => {
  try {
    const currentComment = await req.comment.comments.find(comm => {
      return req.body.id === comm._id.toString();
    });
    const isOwner = req.user._id.toString() === currentComment.user.toString();
    if (!isOwner) throw new Error('You are not the writer of the comment');
    currentComment.content = req.body.content;
    await req.comment.save();
    res.status(201).send(req.comment);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const deleteComment = async (req, res) => {
  try {
    const commentIndex = await req.comment.comments.findIndex(comm => {
      return req.body.id === comm._id.toString();
    });
    const isOwner = req.user._id.toString() === req.comment.comments[commentIndex].user.toString();
    if (!isOwner) throw new Error('You are not the writer of the comment');
    req.comment.comments.splice(commentIndex, 1);
    await req.comment.save();
    res.status(201).send({message: 'Comment deleted'});
  } catch (e) {
    res.status(400).send(e.message);
  }
};

module.exports = { addComment, editComment, deleteComment };