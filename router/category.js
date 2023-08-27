const express = require("express");
const router = express.Router();

const Category = require("../models/category");

router.get("/", async (req, res) => {
  try {
    const { name, tasks } = req.query;
    let filter = {};
    if (name || tasks) {
      if (name) {
        filter.name = name;
      }
      if (tasks) {
        filter.tasks = tasks;
      }
    }

    res.status(200).send(await Category.find(filter));
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const findCategory = await Category.findOne({ _id: req.params.id });
    res.status(200).send(findCategory);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newCategory = new Category({
      name: req.body.name,
      tasks: req.body.tasks,
    });
    await newCategory.save();
    res.status(200).send(newCategory);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});
