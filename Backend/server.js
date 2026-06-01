const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let todos = [];

// GET
app.get("/todos", (req, res) => {
  res.json(todos);
});

// POST
app.post("/todos", (req, res) => {
  const todo = {
    id: Date.now(),
    text: req.body.text,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    priority: req.body.priority,
  };

  todos.push(todo);
  res.json(todo);
});

// PUT (UPDATE) ✅ FIXED
app.put("/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  todos[index] = {
    ...todos[index],
    text: req.body.text,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    priority: req.body.priority,
  };

  res.json(todos[index]);
});

// DELETE
app.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  todos = todos.filter((t) => t.id !== id);

  res.json({ message: "Deleted" });
});

app.listen(5000, () => {
  console.log("Server running on 5000");
});