const express = require("express");
const router = express.Router();
const user = require("../controller/userController");
const { checkAuthApi } = require("../middleware/auth");

router.post("/register", user.registerUser);
router.post("/login", user.loginUser);
router.get("/check", checkAuthApi, user.checkLogin);
router.get("/logout", checkAuthApi, user.logout);

module.exports = router;
