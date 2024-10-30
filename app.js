const express = require("express");
const mongoose = require("mongoose");
const todoRouteHandler = require("./routeHandler/routeHandler");

// express app initialization
const app = express();
app.use(express.json());

// connect to database with mongoose
mongoose
  .connect("mongodb://localhost/todos")
  .then(() => console.log("Connected to database successfully......"))
  .catch((err) => console.log(err));

// application routes
app.use("/todo", todoRouteHandler);

// default error handler
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};

// listen on port server is running on
app.listen(3000, () => console.log("Server is running on port 3000"));
