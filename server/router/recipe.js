const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const { addRecipe } = require("../controller/recipe");

router.post("/api/recipe/add", auth, addRecipe);

module.exports = router;
