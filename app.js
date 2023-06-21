const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const {
  connectToMongoDb,
} = require("./client/database/database");
app.use(express.json());
connectToMongoDb();

app.use("/", express.static("client"));
app.use("/css", express.static("client/css"));
app.use("/js", express.static("client/js"));



const logingApi = require("./client/routes/logingApi");
const signUpApi = require("./client/routes/signUpApi")



app.use("/api", logingApi);

app.use("/api", signUpApi)

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
