const express = require("express");
const router = express.Router();
const userSignup = require("../controllers/signup");
// const { signupFormHTML } = require("../js/forms/signupForm");

router.post("/user", userSignup.signup);
// router.get("/signup", (request, response)=>{
//     // const signupForm = signupFormHTML()
//     response.send(`<h2>Signup Form</h2>${signupForm}`)
// })
module.exports = router;
