const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const {
  loginUser,
  signupUser,
  logoutUser,
  deleteUser,
  activeUser,
} = require("../controller/user");

router.post("/api/user/signup", signupUser);
router.post("/api/user/login", loginUser);
router.post("/api/user/logout",auth, logoutUser);
router.delete("/api/user/delete", auth, deleteUser);
// W-I-P
router.post("/api/user/activate", activeUser);

module.exports = router;