const express = require("express");
const mongoose = require("mongoose");
const todoRoutesHandler = require("./routes/todoRoutesHandler");

// express app initialization
const app = express();
app.use(express.json());

// connect to database
mongoose
  .connect("mongodb://localhost/todos")
  .then(() => console.log("database connected successfully........."))
  .catch((err) => console.log(err));

// applicaton routes
app.use("/todo", todoRoutesHandler);

// defutl error handler
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};

// listsen sevrer on port 3000
app.listen(3000, () => console.log("listening on port 3000........"));
