import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const [editingId, setEditingId] = useState(null);

  // Fetch Todos
  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/todos");
      setTodos(res.data);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Clear Form
  const clearForm = () => {
    setText("");
    setTitle("");
    setDescription("");
    setStatus("");
    setPriority("");
  };

  // Add Todo
  const addTodo = async () => {
    try {
      if (!text || !title || !description || !status || !priority) {
        alert("Please fill all fields");
        return;
      }

      await axios.post("http://localhost:5000/todos", {
        text,
        title,
        description,
        status,
        priority,
      });

      clearForm();
      fetchTodos();
    } catch (error) {
      console.error("Add Error:", error);
    }
  };

  // Edit Todo
  const editTodo = (todo) => {
    setEditingId(todo.id);

    setText(todo.text);
    setTitle(todo.title);
    setDescription(todo.description);
    setStatus(todo.status);
    setPriority(todo.priority);
  };

  // Update Todo
 const updateTodo = async () => {
  console.log("editingId =", editingId);

  try {
    const res = await axios.put(
      `http://localhost:5000/todos/${editingId}`,
      {
        text,
        title,
        description,
        status,
        priority,
      }
    );

    console.log("Updated:", res.data);

    fetchTodos();
    clearForm();
    setEditingId(null);
  } catch (error) {
    console.error(error);
  }
};
  // Delete Todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  return (
    <div className="container">
      <h1>Todo App</h1>

      <div className="input-box">
        <input
          type="text"
          placeholder="Enter Todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="open">Open</option>
          <option value="close">Close</option>
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="">Select Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        {editingId ? (
          <button onClick={updateTodo}>Update</button>
        ) : (
          <button onClick={addTodo}>Add</button>
        )}
      </div>

      <br />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Todo</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {todos.length > 0 ? (
            todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.text}</td>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>{todo.status}</td>
                <td>{todo.priority}</td>

                <td>
                  <button
                    onClick={() => editTodo(todo)}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTodo(todo.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No Todos Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;