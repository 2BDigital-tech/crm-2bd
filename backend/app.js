const express = require("express");
const bodyParser = require("body-parser");
const usersRoutes = require("./routes/users-routes");
const dataRoutes = require("./routes/data-routes");
const tasksRoutes = require("./routes/task-routes");
const HttpError = require("./models/error");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
var mongoUtil = require("./connection/mongoUtil");

mongoUtil.connectToServer(function (err, client) {
  if (err) console.log(err);
  // start the rest of your app here
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "*");
  console.log(req.body);
  next();
});

app.use("/api/users", usersRoutes);
app.use("/api/data", dataRoutes);
app.use("/api/tasks", tasksRoutes);

app.use((req, res, next) => {
  console.log(req);
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "something went wrong" });
});

mongoose.connect(process.env.MONGODB_URI);
// mongoose.createConnection(process.env.MONGODB_NILLAETBEN);
// .then(() => app.listen(80))
// .catch((err) => console.log(err));

const port = process.env.PORT || 80;
app.listen(port, console.log(`Listening on port ${port} ...`));
