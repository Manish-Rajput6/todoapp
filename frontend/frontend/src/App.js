import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [todos, setTodos] = useState([]);

  // States
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ status, setStatus] = useState("");
  const[priority,setpriority]=useState("");

  // Fetch Todos
  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:5000/todos");
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add Todo
  const addTodo = async () => {

    if (!title || !description || !status||!priority) return;

    await axios.post("http://localhost:5000/todos", {
      text,
      title,
      description,
      status,
      priority,
    });

    // Clear Inputs
    setText("");
    setTitle("");
    setDescription("");
    setStatus("");
    setpriority("");

    fetchTodos();
  };

  // Delete Todo
  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    fetchTodos();
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
placeholder="select Status"
onChange={(e)=> setStatus(e.target.value)}
       >
        <option value ="">select Status</option>
        <option value="open">open</option>
        <option  value="close">close</option>

</select>

<select
        placeholder="Enter output time"
        onChange={(e)=> setpriority(e.target.value)}
        >
<option value="">select priority</option>
<option value="High">High</option>
<option value="low">low</option>
<option value="medium">low </option>

</select>
                                                   

        <button onClick={addTodo}>
          Add
        </button>

      </div>

      <table border="1">

        <thead>
          <tr>
            <th>Todo</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>priority</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {todos.map((todo) => (

            <tr key={todo.id}>

              <td>{todo.text}</td>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>{todo.status}</td>
              <td>{todo.priority}</td>

              <td>
                <button onClick={() => deleteTodo(todo.id)}>
                  Delete
                </button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default App;