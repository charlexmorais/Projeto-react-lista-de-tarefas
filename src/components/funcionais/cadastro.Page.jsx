import React, { useState } from "react";
import "/src/css/paginas.css";
import { Link } from "react-router-dom";

const CadastroPage = () => {
  // Definição dos estados utilizando o useState
  const [title, setTitle] = useState(""); // Estado para armazenar o título da tarefa
  const [task, setTask] = useState(""); // Estado para armazenar a descrição da tarefa
  const [status, setStatus] = useState("listadas"); // Estado para armazenar o status da tarefa
  const [error, setError] = useState(""); // Estado para armazenar a mensagem de erro

  // Função para lidar com a alteração do título da tarefa
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Função para lidar com a alteração da descrição da tarefa
  const handleChange = (e) => {
    setTask(e.target.value);
  };

  // Função para lidar com a alteração do status da tarefa
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  // Função para lidar com o envio do formulário de cadastro
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação dos campos de título e descrição
    if (title.trim() === "" || task.trim() === "") {
      setError("Os campos não podem estar vazios.");
      return;
    }

    // Criação de um novo objeto de tarefa
    const newTask = {
      title: title,
      task: task,
      status: status,
    };

    try {
      // Envio da requisição POST para criar a nova tarefa
      const response = await fetch("http://localhost:3000/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      const data = await response.json();

      if (response.ok) {
        // Redireciona para a página de cadastro de tarefas após o sucesso
        window.location.href = "/tarefas/cadastro";
      } else {
        setError("Erro ao criar tarefa."); // Define a mensagem de erro
        console.log(setError);
      }
    } catch (error) {
      setError("Erro ao criar tarefa."); // Define a mensagem de erro
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
          {error && <p className="error-message">{error}</p>}

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
            <option value="listadas">Listadas</option>
            <option value="iniciadas">Iniciadas</option>
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

