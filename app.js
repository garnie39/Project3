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

const logingApi = require("./client/controllers/session");
const signUpApi = require("./client/controllers/users");

app.use("/api", logingApi);

app.use("/api", signUpApi);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
