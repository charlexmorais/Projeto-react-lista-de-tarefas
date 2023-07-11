import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const CadastroPage = () => {
  const navigate = useNavigate();

  // Estados para armazenar os valores dos campos
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("listadas");

  // Estados para armazenar as mensagens de erro e sucesso
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Estados para controlar a exibição das mensagens de erro e sucesso
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

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

  // Função para exibir a mensagem de sucesso
  const showSuccess = () => {
    setSuccessMessage("Tarefa criada com sucesso.");
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000); // Define o tempo de exibição da mensagem (3 segundos)
  };

  // Função para exibir a mensagem de erro
  const showError = () => {
    setErrorMessage("Erro ao criar tarefa.");
    setShowErrorMessage(true);
    setTimeout(() => {
      setShowErrorMessage(false);
    }, 3000); // Define o tempo de exibição da mensagem (3 segundos)
  };

  // Função para lidar com o envio do formulário de cadastro
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !task.trim()) {
      showError();
      throw new Error("Os campos não podem estar vazios.");
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

      if (response.status === 201) {
        showSuccess();
        setTitle("");
        setTask("");
        setStatus("listadas");
        navigate("/tarefas/cadastro");
      } else {
        showError();
        throw new Error("Erro ao criar tarefa.");
      }
    } catch (error) {
      setErrorMessage("Erro ao criar tarefa: " + error.message);
      setSuccessMessage("");
      throw error;
    }
  };

  // Efeito para exibir o erro no console
  useEffect(() => {
    console.log("Erro capturado:", errorMessage);
  }, [errorMessage]);

  return (
    <div className="menu-container">
      <div className="background-image"></div>
      <div className="content">
        <h2>Cadastro de Tarefa</h2>
        <Link to="/">
          <button className="btn-cadastro">Menu</button>
        </Link>
        <form className="container" onSubmit={handleSubmit}>
          {showErrorMessage && (
            <p className="error-message">{errorMessage}</p>
          )}
          {showSuccessMessage && (
            <p className="success-message">{successMessage}</p>
          )}

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
