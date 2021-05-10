const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const recipe = require("../middleware/recipe");
const comment = require("../middleware/comment");
const { addComment, editComment, deleteComment, getComments } = require("../controller/comment");

router.post('/api/comment/add', auth, recipe, addComment);
router.patch("/api/comment/edit", auth, comment, editComment);
router.delete("/api/comment/delete", auth, comment, deleteComment);
router.get("/api/comment/get", getComments);
module.exports = router;
