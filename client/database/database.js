require("dotenv").config();

const { MongoClient } = require("mongodb");
const mongoClient = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING);

let testCollection;
let userCollection;
let eventCollection;

const connectToMongoDb = () => {
  try {
    mongoClient
      .connect()
      .then((_) => {
        const db = mongoClient.db("project3");
        testCollection = db.collection("test");
        userCollection = db.collection("users");
        eventCollection = db.collection("eventsList");
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log("Error Connecting To Mongo Database");
  }
};

const getUserCollection = () => userCollection;
const getTestCollection = () => testCollection;
const getEventCollection = () => eventCollection;

module.exports = {
  connectToMongoDb,
  getTestCollection,
  getUserCollection,
  getEventCollection,
};
