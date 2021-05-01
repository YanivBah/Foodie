const Comment = require("../model/comment");

const comment = async (req, res, next) => {
  try {
    const comment = await Comment.findOne({"comments._id": req.body.id});
    if (!comment) throw new Error();
    req.comment = comment;
    next();
  } catch (e) {
    res.status(404).send({ error: "Comment not found." });
  }
};

module.exports = comment;