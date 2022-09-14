const express = require("express");
const bodyParser = require("body-parser");
const usersRoutes = require("./routes/users-routes");
const dataRoutes = require("./routes/data-routes");
const tasksRoutes = require("./routes/task-routes");
const bookingRoutes = require("./routes/book-routes");
const HttpError = require("./models/error");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

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
app.use("/api/booking", bookingRoutes);

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

// .then(() => app.listen(80))
// .catch((err) => console.log(err));

const port = process.env.PORT || 80;
app.listen(port, console.log(`Listening on port ${port} ...`));
