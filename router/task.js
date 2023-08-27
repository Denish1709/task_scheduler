const express = require("express");
const router = express.Router();

const Task = require("../models/task");

router.get("/", async (req, res) => {
  const { status, priority, category } = req.query;
  let filter = {};
  if (status || priority || category) {
    if (status) {
      filter.status = { $in: status.split("/") };
    }
    if (priority) {
      filter.priority = { $in: priority.split("/") };
    }
    if (category) {
      filter.category = { $in: category.split("/") };
    }
  }
  const tasklist = await Task.find(filter);
  res.send(tasklist);
});

router.get("/:id", async (req, res) => {
  const findtask = await Task.findOne({ _id: req.params.id });
  res.send(findtask);
});

router.post("/", async (req, res) => {
  const newTask = new Task({
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
    status: req.body.status,
    priority: req.body.priority,
    category: req.body.category,
  });

  await newTask.save();
  res.send(newTask);
});

router.put("/:id", async (req, res) => {
  const task_id = req.params.id;
  const updateTask = await Task.findByIdAndUpdate(task_id, req.body, {
    new: true,
  });
  res.send(updateTask);
});

router.delete("/:id", async (req, res) => {
  const task_id = req.params.id;
  const deleteTask = await Task.findByIdAndDelete(task_id);
  res.send(deleteTask);
});

module.exports = router;
