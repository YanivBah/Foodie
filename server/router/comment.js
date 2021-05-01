const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const recipe = require("../middleware/recipe");
const comment = require("../middleware/comment");
const { addComment, editComment } = require("../controller/comment");

router.post('/api/comment/add', auth, recipe, addComment);
router.patch("/api/comment/edit", auth, comment, editComment);
// router.post("/api/recipe/add", auth, addRecipe);
// router.delete("/api/recipe/delete", auth, recipe, deleteRecipe);
// router.post("/api/recipe/rating", auth, recipe, rateRecipe);
// router.post("/api/recipe/approve", auth, recipe, approveRecipe);
module.exports = router;
