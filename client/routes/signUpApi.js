const express = require("express");
const router = express.Router();
const {getUserCollection} = require("../database/database");
const bcrypt = require('bcrypt');

// const userSignup = require("../controllers/signup");
// const { signupFormHTML } = require("../js/forms/signupForm");

router.post("/user", (request, response) => {
    const userCollection = getUserCollection();
    const { name, email, password } = request.body;

    // Perform password hash for security
    const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync());

    if (!name || !email || !password) {
        response.status(400).json({ message: "missing mandatory fields" });
        return;
    }

    if (password.length < 8) {
        response.status(400).json({ message: "password must be 8 characters or more" });
        return;
    }

    userCollection.findOne({ email: email }).then((user) => {
        if (user) {
            response.status(400).json({ message: `user with the email ${email} already exists` });
            return;
        }

        userCollection
            .insertOne({
                name: name,
                email: email,
                passwordHash: passwordHash
            })
            .then(() => {
                response.json({ message: "User signup was successful" });
                console.log("User signup was successful");
            })
            .catch((err) => {
                response.status(500).json({ message: "Internal Server Error" });
            });
    });
});


// router.get("/signup", (request, response)=>{
//     // const signupForm = signupFormHTML()
//     response.send(`<h2>Signup Form</h2>${signupForm}`)
// })
module.exports = router;
