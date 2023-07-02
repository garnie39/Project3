const express = require("express");
const router = express.Router();
const { getUserCollection, getFriendsListCollection, getMessageCollection } = require("../database/database");
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

router.get("/allUsers", (req, res) => {
  const userCollection = getUserCollection();
  userCollection
    .find({}, {username: 1})
    .toArray()
    .then((response) => {
      const username = response.map((users)=>
        users.username
      )
      res.json({username:username})
    });
});


router.post("/addFriend", (request, response) => {
  const friendsListCollection = getFriendsListCollection();
  const username = request.body.username;
  const sessionUsername = request.session.username;

  friendsListCollection
    .findOne({ user: sessionUsername })
    .then((result) => {
      if (result) { 
        const friendsArray = result.friends; 
        if (friendsArray.includes(username)) {
          response.status(400).json({ error: "Friend already exists" });
        } else {
          friendsArray.push(username); 
          friendsListCollection
            .updateOne(
              { user: sessionUsername },
              { $set: { friends: friendsArray } }
            )
            .then(() => {
              response.json({ message: "Friend added successfully" });
            })
        }
      } else {
        friendsListCollection
          .insertOne({
            user: sessionUsername,
            friends: [username], 
          })
          .then(() => {
            response.json({ message: "Friend added successfully" });
          })
      }
    })
});




router.get("/usersFriendsList", (req, res) => {
  const friendsListCollection = getFriendsListCollection();
  friendsListCollection
    .findOne({ user: req.session.username })
    .then((result) => {
      if (result) {
        const friends = result.friends;
        res.json({ friends });
      } else {
        res.json({ friends: [] });
      }
    })
});


router.post("/message", (request, response)=>{
  const messageCollection = getMessageCollection();
  const sendMessageTextInput = request.body.sendMessageTextInput
  const friend = request.body.friend
  const sessionUsername = request.session.username
  const users = [sessionUsername, friend];
  const usersSorted = users.sort();
  const message = {
    user: sessionUsername,
    text: sendMessageTextInput
  }
  messageCollection.findOne({users: usersSorted})
  .then((result)=>{
    if(result){
      return messageCollection.updateOne(
        { users: usersSorted },
        { $push: { message: message} }
      );
    } else {
      return messageCollection.insertOne({
        users: usersSorted,
        message: [message] 
      });
    }
  })
})



router.get("/getMessages", (req, res) => {
  const messageCollection = getMessageCollection();
  const friend = req.query.friend;
  const sessionUsername = req.session.username;
  const users = [sessionUsername, friend];
  const usersSorted = users.sort();

  messageCollection
    .findOne({ users: usersSorted })
    .then((result) => {
      if (result) {
        const message = result.message;
        res.json({ message, sessionUsername });
        // console.log(message.map((msg)=>msg.text))
      } else {
        res.json({ message: [] });
      }
    })
    .catch((error) => {
      console.error("Failed to retrieve messages:", error);
      res.status(500).json({ error: "Failed to retrieve messages" });
    });
});



module.exports = router;
