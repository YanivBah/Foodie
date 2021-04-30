const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const { loginUser, signupUser, logoutUser } = require("../controller/user");

router.post("/api/user/signup", signupUser);
router.post("/api/user/login", loginUser);
router.post("/api/user/logout",auth, logoutUser);

module.exports = router;