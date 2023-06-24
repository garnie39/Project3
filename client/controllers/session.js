const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { getUserCollection } = require("../database/database");

router.get("/login", (request, response) => {
  if (request.session.username) {
    response.json(req.session);
  } else {
    response.status(400).json({ message: "User is not logged in" });
    return;
  }
});

router.post("/login", (request, response) => {
  let user;
  console.log(user);
  const userCollection = getUserCollection();

  userCollection.findOne({ username: request.body.username }).then((result) => {
    user = result;
    if (
      !user ||
      !bcrypt.compareSync(request.body.password, user.passwordHash)
    ) {
      response.status(401).json({ error: "Invalid username or password" });
      return;
    }

    response.json({ message: "User login was successsful" });
  });
});

router.delete("/login", (request, response) => {
  request.session.destroy();
  response.json({ message: "Successfully Logged out" });
});

module.exports = router;
