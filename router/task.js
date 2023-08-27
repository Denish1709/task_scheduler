const express = require("express");
const router = express.Router();

const Task = require("../models/task");

router.get("/", async (req, res) => {
  const { status, priority, category } = req.query;
  let filter = {};
  if (status || priority || category) {
    if (status) {
      filter.status = status;
    }
    if (priority) {
      filter.priority = priority;
    }
    if (category) {
      filter.category = category;
    }
  }
  res.send(await Task.find(filter));
});

router.get("/:id", async (req, res) => {
  const findtask = await Task.findOne({ _id: req.params.id });
  res.send(findtask);
});

router.post("/", async (req, res) => {
  try {
    const newTask = new Task({
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      status: req.body.status,
      priority: req.body.priority,
      category: req.body.category,
    });

    await newTask.save();
    res.status(200).send(newTask);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.put("/:id", async (req, res) => {
  const task_id = req.params.id;
  const updateTask = await Task.findByIdAndUpdate(task_id, req.body, {
    runValidators: true,
    new: true,
  });
  res.send(updateTask);
});

router.put("/:id/completed", async (req, res) => {
  const task_id = req.params.id;
  const completedTask = await Task.findByIdAndUpdate(
    task_id,
    {
      completed: true,
    },
    {
      new: true,
    }
  );
  res.send(completedTask);
});

router.delete("/:id", async (req, res) => {
  const task_id = req.params.id;
  const deleteTask = await Task.findByIdAndDelete(task_id);
  res.send(deleteTask);
});

module.exports = router;
