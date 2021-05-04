const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const { addIngredient } = require("../controller/ingredient");

router.post('/api/ingredient/add', auth, (req, res) => {});
// router.patch("/api/comment/edit", auth, comment, editComment);
// router.delete("/api/comment/delete", auth, comment, deleteComment);
module.exports = router;
