import React, { useState, useEffect } from "react";
import "./css/paginas.css";

const TaskList = () => {
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("listadas");
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTask, setEditTask] = useState(null);
  const [editTitle, setEditTitle] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/task");
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
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    if (searchTerm.trim().length === 0) {
      // Campo de pesquisa vazio ou sem caracteres significativos, não é necessário fazer a chamada à API
      return;
    }

    fetchTasksBySearchTerm(searchTerm);
  };

  const fetchTasksBySearchTerm = async (searchTerm) => {
    try {
      const response = await fetch(
        `http://localhost:3000/task?search=${searchTerm}`
      );
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        setTasks(data);
      } else {
        // Nenhuma tarefa encontrada
        setTasks([]);
      }
    } catch (error) {
      console.log("Error fetching tasks by search term:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editTaskId !== null) {
      // Atualizar tarefa existente em modo de edição
      const updatedTask = {
        title: editTitle,
        task: editTask,
        status: status,
      };

      try {
        await fetch(`http://localhost:3000/task/${editTaskId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        });

        const updatedTasks = tasks.map((task) => {
          if (task.id === editTaskId) {
            return {
              ...task,
              ...updatedTask,
            };
          }
          return task;
        });

        setTasks(updatedTasks);
        setEditTaskId(null);
        setEditTask(null);
        setEditTitle(null);
      } catch (error) {
        console.log("Error updating task:", error);
      }
    } else {
      // Adicionar nova tarefa
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
    }

    setTitle("");
    setTask("");
    setStatus("listadas");
  };

  const handleEdit = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setEditTitle(taskToEdit.title);
    setEditTask(taskToEdit.task);
    setEditTaskId(id);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/task/${id}`, {
        method: "DELETE",
      });

      const updatedTasks = tasks.filter((task) => task.id !== id);
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

    if (filteredTasks.length === 0) {
      return <p>Nenhuma tarefa cadastrada.</p>;
    }

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
    
            <input
              value={editTask}
              onChange={handleChange} // Atualizada a função de handleChange
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
            <h4>{task.title}</h4>
            <p>{task.task}</p>
            <div>
              <button
                className="btn-editar"
                onClick={() => handleEdit(task.id)}
              >
                Editar
              </button>
            </div>
    
            <button
              className="btn-delete"
              onClick={() => handleDelete(task.id)}
            >
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
        <input
          type="text"
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

      <h2>Listadas</h2>
      <p>titulo:</p>
      {renderTasks("listadas")}

      <h2>Iniciadas</h2>
      <p>titulo:</p>
      {renderTasks("iniciadas")}

      <h2>Finalizadas</h2>
      <p>titulo:</p>
      {renderTasks("finalizadas")}
    </div>
  );
};

export default TaskList;
