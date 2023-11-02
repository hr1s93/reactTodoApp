import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleAdd() {
    if (task.trim() !== "") {
      const newTask = {
        task: task,
        isCompleted: false,
      };
      setTasks([...tasks, newTask]);
      setTask("");
    }
  }

  function handleRemove(id) {
    setTasks(tasks.filter((_, index) => index !== id));
  }

  function handleToggle(id) {
    const updatedTasks = tasks.map((task, index) =>
      index === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
  }

  return (
    <>
      <div className="container">
        <input
          className="input-bar"
          type="text"
          placeholder="Add task"
          value={task}
          maxLength={20}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? handleAdd() : null)}
        />
        <button className="btn-add" onClick={handleAdd}>
          Add
        </button>
      </div>
      <div className="tasks">
        <ul>
          {tasks.map((todo, id) => (
            <li key={id}>
              <span
                onClick={() => handleToggle(id)}
                className={todo.isCompleted ? "striked" : ""}
              >
                {todo.task}
              </span>
              <button className="btn-remove" onClick={() => handleRemove(id)}>
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
