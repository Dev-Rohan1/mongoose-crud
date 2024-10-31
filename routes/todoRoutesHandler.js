const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchemas");
const Todo = new mongoose.model("Todo", todoSchema);

// GET ALL TODOS
router.get("/", async (req, res) => {
  try {
    const data = await Todo.find({ __v: 0 });
    res.status(200).json({
      message: "Todo find by all successfully",
    });
    console.log(data);
  } catch (err) {
    res.status(500).json({
      error: "There were a server side error!",
    });
  }
});

// GET A TODO BY ID
router.get("/:id", async (req, res) => {
  try {
    const data = await Todo.findById({ _id: req.params.id });
    res.status(200).json({
      message: "Todo find by id successfully",
    });
    console.log(data);
  } catch (err) {
    res.status(500).json({
      error: "There were a server side error!",
    });
  }
});

// POST A TODO
router.post("/", (req, res) => {
  try {
    const todo = new Todo(req.body);
    todo.save();
    res.status(200).json({ message: "Todo was inserted successfully" });
  } catch (err) {
    res.status(500).json({ error: "There Was an server-side error" });
  }
});

// POST MULTIPLE TODOS
router.post("/all", (req, res) => {
  try {
    Todo.insertMany(req.body);
    res.status(200).json({
      message: "Todo were inserted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "There were a server side error!",
    });
  }
});

// UPDATE A TODO
router.put("/:id", (req, res) => {
  try {
    Todo.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: "inactive",
        },
      }
    );

    res.status(200).json({ message: "Todo was updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "There Was an server-side error" });
  }
});

// DELETE A TODO
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
