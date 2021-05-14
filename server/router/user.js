const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/imageUpload");

const {
  loginUser,
  signupUser,
  logoutUser,
  deleteUser,
  activeUser,
  getUser,
  getUserRecipes,
  getUserAvatar,
  updateUser,
} = require("../controller/user");

router.post("/api/user/signup", upload.single("image"), signupUser);
router.post("/api/user/login", loginUser);
router.post("/api/user/logout",auth, logoutUser);
router.patch("/api/user/update", auth, upload.single("image"), updateUser);
router.delete("/api/user/delete", auth, deleteUser);
router.get("/api/user/info", getUser);
router.get("/api/user/recipes", getUserRecipes);
router.get("/api/user/avatar", getUserAvatar);
// W-I-P
// router.post("/api/user/activate", activeUser);

module.exports = router;