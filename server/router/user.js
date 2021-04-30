const express = require("express");
const router = new express.Router();
// const auth = require("../middleware/auth");
const { loginUser, signupUser } = require("../controller/user");

router.post("/api/user/signup", signupUser);
router.post("/api/user/login", loginUser);

module.exports = router;