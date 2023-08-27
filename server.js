const express = require("express");
const mongoose = require("mongoose");

// create an instance of express
const app = express();

// middleware to handle JSON request
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/tasks")
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// routes
const taskRouter = require("./routes/task");

app.use("/tasks", taskRouter);

app.get("/", (req, res) => {
  res.send("<a href='/tasks'>Task</a>");
});

// start the server
app.listen(5000, () => {
  console.log("Server is running at http://localhost:5000");
});