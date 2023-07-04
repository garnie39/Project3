const express = require("express");
const router = express.Router();
const { getEventCollection } = require("../database/database.js");
const { ObjectId } = require("mongodb");

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

router.get("/:id", (request, response) => {
  const eventsCollection = getEventCollection();
  const eventId = request.params.id;

  if (!ObjectId.isValid(eventId)) {
    // Updated this line
    response.status(400).json({ message: "Invalid event ID" });
    return;
  }

  eventsCollection.deleteOne({ _id: new ObjectId(eventId) }).then((_) => {
    response.json();
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
  const eventId = request.params.id; // Updated this line

  if (!ObjectId.isValid(eventId)) {
    // Updated this line
    response.status(400).json({ message: "Invalid event ID" });
    return;
  }

  eventsCollection.deleteOne({ _id: new ObjectId(eventId) }).then((_) => {
    response.json();
  });
});

// Edit event
router.put("/:id", (request, response) => {
  try {
    const eventsCollection = getEventCollection();
    const eventId = request.params.id;

    if (!ObjectId.isValid(eventId)) {
      response.status(400).json({ message: "Invalid event ID" });
      return;
    }

    const filter = { _id: new ObjectId(eventId) };
    const update = { $set: request.body };

    eventsCollection.updateOne(filter, update).then(() => {
      response.json({ message: "Event updated successfully" });
    });
  } catch (error) {
    console.error("Error updating event:", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
});

// UPDATE event
router.patch("/:id", (request, response) => {
  try {
    const eventsCollection = getEventCollection();
    const eventId = request.params.id;

    if (!ObjectId.isValid(eventId)) {
      response.status(400).json({ message: "Invalid event ID" });
      return;
    }

    const filter = { _id: new ObjectId(eventId) };
    const update = { $set: request.body };

    eventsCollection.updateOne(filter, update).then(() => {
      response.json({ message: "Event updated successfully" });
    });
  } catch (error) {
    console.error("Error updating event:", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
