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
    !request.body.enddate ||
    !request.body.userJoin
  ) {
    response.status(400).json({
      message: "eventname, startdate, enddate and invite are mandatory fields",
    });
    return;
  }
  console.log(request.body);

  if (
    !request.body.eventname ||
    !request.body.startdate ||
    !request.body.userJoin ||
    !request.body.enddate
  ) {
    response.status(400).json({
      message: "eventname, startdate, enddate and invite are mandatory fields",
    });
    return;
  }
  eventsCollection.insertOne(request.body).then((_) => {
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
