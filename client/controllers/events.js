const express = require("express");
const router = express.Router();
const { getEventCollection } = require("../database/database.js");

// GET events
router.get("/", (_, response) => {
  const eventsCollection = getEventCollection();
  eventsCollection
    .find()
    .toArray()
    .then((events) => {
      response.json(events);
    });
});

// POST event
router.post("/", (request, response) => {
  const eventsCollection = getEventCollection();
  console.log(eventsCollection);
  if (
    !request.body.eventname ||
    !request.body.startdate ||
    !request.body.enddate
  ) {
    response.status(400).json({
      message: "eventname, startdate, enddate and invite are mandatory fields",
    });
    return;
  }

  if (
    !request.body.eventname ||
    !request.body.startdate ||
    !request.body.enddate
  ) {
    response.status(400).json({
      message: "eventname, startdate, enddate and invite are mandatory fields",
    });
    return;
  }
  eventsCollection
    .insertOne({
      username: request.body.username,
      currentTime: request.body.timestamp,
      eventName: request.body.eventname,
      startDate: request.body.startdate,
      endDate: request.body.enddate,
      userJoin: request.body.userJoin,
      user_input: request.body.userInput,
    })
    .then((_) => {
      console.log(request.body);
      response.json();
    });
});

// DELETE event
router.delete("/:id", (request, response) => {
  const eventsCollection = getEventCollection();
  eventsCollection
    .deleteOne({ _id: new ObjectId(request.params.id) })
    .then((_) => {
      response.json();
    });
});

module.exports = router;
