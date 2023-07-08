import React, { useState } from "react";
import "./paginas.css";
import { Link } from "react-router-dom";

const CadastroPage = () => {
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("listadas"); // Estado para armazenar o status da tarefa

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

    if (title.trim() === "" || task.trim() === "") {
      console.log("Os campos não podem estar vazios.");
      return;
    }

    const newTask = {
      title: title,
      task: task,
      status: status, // Adicione o status à nova tarefa
    };

    try {
      // Envie a nova tarefa com o status selecionado para o servidor
      const response = await fetch("http://localhost:3000/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirecionar para a página inicial após o cadastro
        window.location.href = "/tarefas";
      } else {
        console.log("Error creating task:", data);
      }
    } catch (error) {
      console.log("Error creating task:", error);
    }
  };

  return (
    <div className="menu-container">
      <div className="background-image"></div>
      <div className="content">
        <h2>Cadastro de Tarefa</h2>
        <Link to="/">
          <button className="btn-cadastro">Menu</button>
        </Link>
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
            <option value="listadas">listadas</option>
            <option value="iniciadas">iniciadas</option>
            <option value="finalizadas">Finalizadas</option>
          </select>

          <button className="btn-cadastro" type="submit">
            Adicionar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CadastroPage;
