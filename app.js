const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3001;
const { connectToMongoDb } = require("./client/database/database");
app.use(express.json());
connectToMongoDb();

app.use("/", express.static("client"));
app.use("/css", express.static("client/css"));
app.use("/js", express.static("client/js"));

require("dotenv").config();
const expressSession = require("express-session");
const MongoStore = require("connect-mongo");
app.use(
  expressSession({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_DB_CONNECTION_STRING,
      dbName: "project3",
    }),
    secret: process.env.EXPRESS_SESSION_SECRET_KEY,
  })
);

const logingApi = require("./client/controllers/session");
const signUpApi = require("./client/controllers/users");
const eventApi = require("./client/controllers/events")

app.use("/api", logingApi);

app.use("/api", signUpApi);

app.use("/api", eventApi);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
