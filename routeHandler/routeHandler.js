const express = require("express");
const router = express.Router();
const todoSchema = require("../todoSchema/todoSchema");
const mongoose = require("mongoose");
const Todo = new mongoose.model("Todo", todoSchema);

// GET ALL TODOS
router.get("/", (req, res) => {
  res.send("GET ALL TODOS");
});

// GET A TODO BY ID
router.get("/:id", async (req, res) => {
  res.send("GET A TODO BY ID");
});

// POST TODO
router.post("/", async (req, res) => {
  try {
    const todo = new Todo(req.body);
    await todo.save();
    res.status(200).json({
      message: "Todo inserted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
});

// POST MULTIPLE TODOS
router.post("/ALL", async (req, res) => {
  try {
    await Todo.insertMany(req.body);
    res.status(200).json({
      message: "Todo inserted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "There were a server side error!",
    });
  }
});

// PUT TODO
router.put("/:id", async (req, res) => {
  try {
    await Todo.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: "inactive",
        },
      }
    );
    res.status(200).json({
      message: "Todo Updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "There were a server side error!",
    });
  }
});

// DETETE TODO
router.delete("/:id", async (req, res) => {
  try {
    await Todo.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "Todo deteted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "There were a server side error!",
    });
  }
});

module.exports = router;
