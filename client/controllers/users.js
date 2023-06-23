const express = require("express");
const router = express.Router();
const { getUserCollection } = require("../database/database");
const bcrypt = require("bcrypt");

// const userSignup = require("../controllers/signup");
// const { signupFormHTML } = require("../js/forms/signupForm");

router.get("/", (req, res) => {
  userCollection
    .find()
    .toArray()
    .then((response) => {
      res.json({ users: response });
    });
});

router.post("/user", (request, response) => {
  const userCollection = getUserCollection();

  const passwordHash = bcrypt.hashSync(
    request.body.password,
    bcrypt.genSaltSync()
  );

  if (!request.body.username || !request.body.email || !request.body.password) {
    response.status(400).json({ message: "missing mandatory fields" });
    return;
  }

  if (request.body.password.length < 8) {
    response
      .status(400)
      .json({ message: "password must be 8 characters or more" });
    return;
  }

  userCollection.findOne({ email: request.body.email }).then((user) => {
    if (user) {
      response.status(400).json({
        message: `user with the email ${request.body.email} already exists`,
      });
      return;
    }

    userCollection
      .insertOne({
        username: request.body.username,
        email: request.body.email,
        passwordHash: passwordHash,
      })
      .then((_) => {
        response.json({ message: "User signup was successful" });
        //   console.log("User signup was successful");
        return;
      })
      .catch((err) => {
        response.status(500).json({ message: "Internal Server Error" });
        return;
      });
  });
});

module.exports = router;
