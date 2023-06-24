const express = require("express");
const router = express.Router();
const { getEventCollection } = require("../database/database.js");

const eventsCollection = getEventCollection();
// GET events
router.get("/", (_, response) => {
  eventsCollection
    .find()
    .toArray()
    .then((events) => {
      response.json(events);
    });
});

// POST event
router.post("/", (request, response) => {
  if (
    !request.body.eventname ||
    !request.body.startdate ||
    !request.body.enddate ||
    !request.body.invite
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
  eventsCollection
    .deleteOne({ _id: new ObjectId(request.params.id) })
    .then((_) => {
      response.json();
    });
});

module.exports = router;
