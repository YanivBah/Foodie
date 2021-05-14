const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const recipe = require("../middleware/recipe");
const upload = require("../middleware/imageUpload");

const {
  addRecipe,
  deleteRecipe,
  rateRecipe,
  approveRecipe,
  editRecipe,
  getRecipe,
  getRecentRecipe,
  getRecipeImage,
  searchRecipes,
} = require("../controller/recipe");

router.post("/api/recipe/add", auth, upload.single("image"), addRecipe);
router.delete("/api/recipe/delete", auth, recipe, deleteRecipe);
router.post("/api/recipe/rating", auth, recipe, rateRecipe);
router.post("/api/recipe/approve", auth, recipe, approveRecipe);
router.patch("/api/recipe/edit", auth, recipe, editRecipe);
router.get("/api/recipe/get", getRecipe);
router.get("/api/recipe/image", getRecipeImage);
router.get("/api/recipe/recent", getRecentRecipe);
router.get("/api/recipe/searchIngredient", searchRecipes);

module.exports = router;
