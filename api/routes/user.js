const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();

router.post("/signup", userController.user_signup);

router.post("/login", userController.user_login);

router.delete("/:userId", userController.delete_user);

module.exports = router;
