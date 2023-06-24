const express = require("express");
const router = express.Router();

const { MongoClient, ObjectId } = require("mongodb");
const mongoClient = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING);
let eventsCollection;

// initialise DB
mongoClient.connect().then(() => {
    const db = mongoClient.db("project3");
    eventsCollection = db.collection("eventsList");
    console.log("Connected to MongoDB eventsList");
}).catch((error) => {
        console.log("Failed to connect to MongoDB Atlas:", error);
});


// GET events
router.get("/", (_, response) => {
    eventsCollection.find().toArray().then((events) => {
        response.json(events)
    })
})

// POST event
router.post("/", (request, response) => {
    if (!request.body.eventname || !request.body.startdate || !request.body.enddate || !request.body.invite) {
        response.status(400).json({ message: "eventname, startdate, enddate and invite are mandatory fields"});
        return;
    }
    eventsCollection.insertOne(request.body).then((_) => {
        response.json();
    })
})

// DELETE event
router.delete("/:id", (request, response) => {
    eventsCollection.deleteOne({ _id: new ObjectId(request.params.id)}).then((_) => {
        response.json();
    });
});




module.exports = router
