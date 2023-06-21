const express = require("express");
const router = express.Router();
const usersLogin = require("../controllers/login");

router.post("/login", usersLogin.login);



module.exports = router;
