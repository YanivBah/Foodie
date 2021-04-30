const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const { addRecipe, deleteRecipe } = require("../controller/recipe");

router.post("/api/recipe/add", auth, addRecipe);
router.post("/api/recipe/delete", auth, deleteRecipe);

module.exports = router;
