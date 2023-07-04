import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TaskPage = ({ status }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasksByStatus();
  }, []);

  const fetchTasksByStatus = async () => {
    try {
      const response = await fetch(`http://localhost:3000/task?status=${status}`);
      const data = await response.json();

      if (Array.isArray(data)) {
        setTasks(data);
      } else {
        console.log("Invalid data format:", data);
      }
    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  };

  return (
    <div>
      <h2>{status}</h2>
      {tasks.map((task) => (
        <div key={task.id} className="task-card">
          <h4>{task.title}</h4>
          <p>{task.task}</p>
          <div>
            <Link to={`/tasks/edit/${task.id}`}>Editar</Link>
            <Link to={`/tasks/delete/${task.id}`}>Deletar</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskPage;