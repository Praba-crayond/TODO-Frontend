import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API_URL}/todos`);
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTodo = async () => {
    if (!task.trim()) return;
    try {
      const res = await axios.post(`${API_URL}/todos`, { task });
      setTodos((prev) => [...prev, res.data]);
      setTask("");
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTodo = async (id, done) => {
    try {
      const res = await axios.put(`${API_URL}/todos/${id}`, { done: !done });
      setTodos((prev) => prev.map((t) => (t.id === id ? res.data : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        maxWidth: 640,
        margin: "40px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Todo App</h1>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Write a new task..."
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((t) => (
          <li
            key={t.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: 8,
            }}
          >
            <span
              onClick={() => toggleTodo(t.id, t.done)}
              style={{
                textDecoration: t.done ? "line-through" : "none",
                cursor: "pointer",
                flex: 1,
              }}
            >
              {t.task}
            </span>
            <button onClick={() => toggleTodo(t.id, t.done)}>✓</button>
            <button onClick={() => deleteTodo(t.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
