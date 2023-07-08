import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./paginas.css";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/task");
      const data = await response.json();

      if (response.ok) {
        setTasks(data);
        setFilteredTasks(data);
      } else {
        console.log("Error fetching tasks:", data);
      }
    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission
      const filtered = tasks.filter((task) =>
        task.title.toLowerCase().includes(filter.toLowerCase())
      );
      setFilteredTasks(filtered);

      if (filtered.length > 0) {
        const taskId = filtered[0].id;
        await fetchTaskById(taskId);
      }
    }
  };

  const fetchTaskById = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3000/task/${taskId}`);
      const data = await response.json();

      if (response.ok) {
        console.log("Task fetched from API:", data);
      } else {
        console.log("Error fetching task:", data);
      }
    } catch (error) {
      console.log("Error fetching task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3000/task/${taskId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the deleted task from the tasks and filteredTasks state
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks);
      } else {
        console.log("Error deleting task");
      }
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  return (
    <div>
      <h2>Tarefas Listadas</h2>
      <div className="filter-container">
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          onKeyDown={handleKeyDown}
          placeholder="Filtrar tarefas"
        />
      </div>
      <Link to="/">
        <button className="btn-cadastro">Menu</button>
      </Link>

      {filteredTasks.map((task) => (
        <div key={task.id} className="task-card">
          <h4>{task.title}</h4>
          <p>{task.task}</p>
          <p>Status: {task.status}</p>
          <div className="button-container">
            <Link to={`/tarefas/editar/${task.id}`}>
              <button className="btn-editar">Editar</button>
            </Link>
            <button className="btn-excluir" onClick={() => deleteTask(task.id)}>
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
