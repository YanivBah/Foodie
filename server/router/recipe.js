const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const { addRecipe, deleteRecipe, rateRecipe } = require("../controller/recipe");

router.post("/api/recipe/add", auth, addRecipe);
router.delete("/api/recipe/delete", auth, deleteRecipe);
router.post("/api/recipe/rating", auth, rateRecipe);
module.exports = router;
