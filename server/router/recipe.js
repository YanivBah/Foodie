const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const recipe = require("../middleware/recipe");
const {
  addRecipe,
  deleteRecipe,
  rateRecipe,
  approveRecipe,
  editRecipe,
  getRecipe,
  getRecentRecipe,
} = require("../controller/recipe");

router.post("/api/recipe/add", auth, addRecipe);
router.delete("/api/recipe/delete", auth, recipe, deleteRecipe);
router.post("/api/recipe/rating", auth, recipe, rateRecipe);
router.post("/api/recipe/approve", auth, recipe, approveRecipe);
router.patch("/api/recipe/edit", auth, recipe, editRecipe);
router.get("/api/recipe/get", recipe, getRecipe);
router.get("/api/recipe/recent", getRecentRecipe);
module.exports = router;
