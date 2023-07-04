import React, { useState, useEffect } from "react";
import "./css/paginas.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("listadas");
  const [searchTerm, setSearchTerm] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editTask, setEditTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/task");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSelectChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editTaskId !== null) {
      // Atualizar tarefa existente
      if (editTitle.trim() === "" || editTask.trim() === "") {
        console.log("Os campos não podem estar vazios.");
        return;
      }

      const updatedTask = {
        title: editTitle,
        task: editTask,
        status: status,
      };

      try {
        const response = await fetch(
          `http://localhost:3000/task/${editTaskId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTask),
          }
        );

        if (response.ok) {
          const updatedTasks = tasks.map((task) =>
            task.id === editTaskId ? { ...task, ...updatedTask } : task
          );
          setTasks(updatedTasks);
        }
      } catch (error) {
        console.log("Error updating task:", error);
      }

      setEditTaskId(null);
      setEditTitle("");
      setEditTask("");
      setStatus("listadas");
    } else {
      // Adicionar nova tarefa
      if (title.trim() === "" || task.trim() === "") {
        console.log("Os campos não podem estar vazios.");
        return;
      }

      const newTask = {
        title: title,
        task: task,
        status: status,
      };

      try {
        const response = await fetch("http://localhost:3000/task", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        });

        const data = await response.json();

        setTasks([...tasks, data]);
      } catch (error) {
        console.log("Error creating task:", error);
      }

      setTitle("");
      setTask("");
      setStatus("listadas");
    }
  };

  const handleEdit = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);

    setEditTaskId(taskId);
    setEditTitle(taskToEdit.title);
    setEditTask(taskToEdit.task);
    setStatus(taskToEdit.status);
  };

  const handleDelete = async (taskId) => {
    try {
      await fetch(`http://localhost:3000/task/${taskId}`, {
        method: "DELETE",
      });

      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  const renderTasks = (status) => {
    const filteredTasks = tasks.filter(
      (task) =>
        task.status === status &&
        (task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.task.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return filteredTasks.map((task) => (
      <div key={task.id} className="task-card">
        {editTaskId === task.id ? (
          <div>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Insira o título"
            />

            <textarea
              value={editTask}
              onChange={(e) => setEditTask(e.target.value)}
              placeholder="Insira a descrição"
            />

            <select value={status} onChange={handleSelectChange}>
              <option value="listadas">Listadas</option>
              <option value="iniciadas">Iniciadas</option>
              <option value="finalizadas">Finalizadas</option>
            </select>
            <button onClick={handleSubmit}>Atualizar</button>
          </div>
        ) : (
          <div>
            <div>
              <strong>Título:</strong>
              <p>{task.title}</p>
            </div>
            <div>
              <strong>Descrição:</strong>
              <p>{task.task}</p>
            </div>
            <div>
              <strong>Status:</strong>
              <p>{task.status}</p>
            </div>
            <button className="btn-editar" onClick={() => handleEdit(task.id)}>
              Editar
            </button>
            <button className="btn-delete" onClick={() => handleDelete(task.id)}>
              Deletar
            </button>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div>
      <h1>Minhas Tarefas</h1>
      <form className="container" onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Insira o título"
        />

        <textarea
          value={task}
          onChange={handleChange}
          placeholder="Insira a descrição"
        />

        <select value={status} onChange={handleSelectChange}>
          <option value="listadas">Listadas</option>
          <option value="iniciadas">Iniciadas</option>
          <option value="finalizadas">Finalizadas</option>
        </select>
        <button type="submit">Adicionar</button>
      </form>

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Pesquisar"
      />

      
      {renderTasks("listadas")}

     
      {renderTasks("iniciadas")}

      
      {renderTasks("finalizadas")}
    </div>
  );
};

export default TaskList;
