const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const {
  connectToMongoDb,
  getTestCollection,
} = require("./client/database/database");

const logingApi = require("./client/routes/logingApi");

app.use("/", express.static("client"));
app.use("/css", express.static("client/css"));
app.use("/js", express.static("client/js"));

app.use(express.json());
connectToMongoDb();

app.use("/api", logingApi);

app.post("/api/test", (request, response) => {
  const testCollection = getTestCollection();
  testCollection.insertOne(request.body).then(() => {
    response.json();
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
