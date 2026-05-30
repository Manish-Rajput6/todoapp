const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let todos = [];

// GET Todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// POST Todo
app.post("/todos", (req, res) => {

  const todo = {
    id: Date.now(),
    text: req.body.text,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    priority:req.body.priority,
  };

  todos.push(todo);

  res.json(todo);
});

// DELETE Todo
app.delete("/todos/:id", (req, res) => {

  const id = Number(req.params.id);

  todos = todos.filter(todo => todo.id !== id);

  res.json({ message: "Todo Deleted" });

});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});