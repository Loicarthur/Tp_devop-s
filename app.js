const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost/todo-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a Task model
const Task = mongoose.model(
  "Task",
  new mongoose.Schema({
    name: String,
    completed: Boolean,
  })
);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.render("index", { tasks });
});

app.post("/tasks", async (req, res) => {
  const task = new Task({ name: req.body.name, completed: false });
  await task.save();
  res.redirect("/");
});

app.post("/tasks/:id/complete", async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, { completed: true });
  res.redirect("/");
});

app.post("/tasks/:id/delete", async (req, res) => {
  await Task.findByIdAndRemove(req.params.id);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
