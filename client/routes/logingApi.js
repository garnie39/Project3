const express = require("express");
const router = express.Router();
const usersLogin = require("../controllers/login");

router.get("/user", usersLogin.login);

module.exports = router;
