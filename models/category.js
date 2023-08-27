const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  tasks: {
    type: Object,
    ref: "Task",
  },
});

const Category = model("Category", categorySchema);
module.exports = categorySchema;
