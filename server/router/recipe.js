const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const recipe = require("../middleware/recipe");
const upload = require("../middleware/imageUploadForRecipe");

const {
  addRecipe,
  deleteRecipe,
  rateRecipe,
  approveRecipe,
  editRecipe,
  getRecipe,
  getRecentRecipe,
} = require("../controller/recipe");

router.post("/api/recipe/add", auth, upload.single("image"), addRecipe);
router.delete("/api/recipe/delete", auth, recipe, deleteRecipe);
router.post("/api/recipe/rating", auth, recipe, rateRecipe);
router.post("/api/recipe/approve", auth, recipe, approveRecipe);
router.patch("/api/recipe/edit", auth, recipe, editRecipe);
router.get("/api/recipe/get", recipe, getRecipe);
router.get("/api/recipe/recent", getRecentRecipe);

// router.get('/imageserving/:id', async (req, res) => {
//   try {
//     const user = await User.findBYId(req.params.id)
//     res.set('Content-Type', 'image/jpeg');
//     res.send(user.avatar);
//   } catch (e) {
//     res.status(400).send()
//   }
// })
module.exports = router;
