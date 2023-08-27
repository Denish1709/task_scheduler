const express = require("express");
const router = express.Router();

const Task = require("../models/task");

router.get("/", async (req, res) => {
  try {
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
    res.status(200).send(await Task.find(filter));
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const findtask = await Task.findOne({ _id: req.params.id });
    res.status(200).send(findtask);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
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
  try {
    const task_id = req.params.id;
    const updateTask = await Task.findByIdAndUpdate(task_id, req.body, {
      new: true,
    });
    res.status(200).send(updateTask);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const task_id = req.params.id;
    const deleteTask = await Task.findByIdAndDelete(task_id);
    res.status(200).send(deleteTask);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

module.exports = router;
