import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditarPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const [status, setStatus] = useState(""); // Estado para controlar o status selecionado

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const response = await fetch(`http://localhost:3000/task/${id}`);
      const data = await response.json();

      if (response.ok) {
        setTitle(data.title);
        setTask(data.task);
        setStatus(data.status); // Definir o status da tarefa no estado
      } else {
        console.log("Error fetching task:", data);
      }
    } catch (error) {
      console.log("Error fetching task:", error);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim() === "" || task.trim() === "" || status === "") {
      console.log("Os campos não podem estar vazios.");
      return;
    }

    const updatedTask = {
      title: title,
      task: task,
      status: status, // Inclua o status na tarefa atualizada
    };

    try {
      const response = await fetch(`http://localhost:3000/task/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        // Redirecionar para a página inicial após a atualização
        window.location.href = "/tarefas";
      } else {
        console.log("Error updating task:", response);
      }
    } catch (error) {
      console.log("Error updating task:", error);
    }
  };

  return (
    <div>
      <h2>Editar Tarefa</h2>
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

        <select value={status} onChange={handleStatusChange}>
          <option value="">Selecione o status</option>
          <option value="listadas">Listadas</option>
          <option value="iniciadas">Iniciadas</option>
          <option value="finalizadas">Finalizadas</option>
        </select>

        <button type="submit">Atualizar</button>
      </form>
    </div>
  );
};

export default EditarPage;
