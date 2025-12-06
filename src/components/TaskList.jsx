import React, { useState } from "react";

export default function TaskList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Welcome — try adding a task", done: false },
    { id: 2, text: "Connect Cognito for redirect-based login", done: false },
  ]);
  const [text, setText] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setTasks((t) => [...t, { id: Date.now(), text: text.trim(), done: false }]);
    setText("");
  };

  const toggle = (id) =>
    setTasks((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));

  const remove = (id) => setTasks((t) => t.filter((x) => x.id !== id));

  return (
    <section className="task-area">
      <div className="task-card">
        <form className="task-form" onSubmit={addTask}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new task (max 100 chars)"
            maxLength={100}
            aria-label="New task"
          />
          <button className="primary" type="submit">
            Add
          </button>
        </form>

        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={task.done ? "done" : ""}>
              <label>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggle(task.id)}
                />
                <span className="task-text">{task.text}</span>
              </label>
              <button
                className="icon"
                onClick={() => remove(task.id)}
                title="Remove"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
