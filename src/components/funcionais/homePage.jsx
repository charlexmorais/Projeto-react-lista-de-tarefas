import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./paginas.css";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/task");
      const data = await response.json();

      if (response.ok) {
        setTasks(data);
      } else {
        console.log("Error fetching tasks:", data);
      }
    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3000/task/${taskId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchTasks(); // Atualiza a lista de tarefas após a exclusão
      } else {
        console.log("Error deleting task:", response);
      }
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  return (
    <div>
      <h2>Tarefas Listadas</h2>
      {tasks.map((task) => (
        <div key={task.id} className="task-card">
          <h4>{task.title}</h4>
          <p>{task.task}</p>
          <p>Status: {task.status}</p>
          <div>
            <div className="btn-editar">
              <Link style={{ textDecoration: 'none' }} to={`/tarefas/editar/${task.id}`}>
                Editar
              </Link>
            </div>
            <div className="btn-excluir">
              <Link style={{ textDecoration: 'none' }} onClick={() => deleteTask(task.id)}>Excluir</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
