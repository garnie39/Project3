require("dotenv").config();

const { MongoClient } = require("mongodb");
const mongoClient = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING);

let testCollection;
let userCollection;
let eventCollection;
let friendsListCollection
let messageCollection;

const connectToMongoDb = () => {
  try {
    mongoClient
      .connect()
      .then((_) => {
        const db = mongoClient.db("project3");
        friendsListCollection = db.collection("friendsList");
        userCollection = db.collection("users");
        eventCollection = db.collection("eventsList");
        messageCollection = db.collection("messages");
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
const getFriendsListCollection =() => friendsListCollection
const getMessageCollection =() => messageCollection

module.exports = {
  connectToMongoDb,
  getTestCollection,
  getUserCollection,
  getEventCollection,
  getFriendsListCollection,
  getMessageCollection
};
