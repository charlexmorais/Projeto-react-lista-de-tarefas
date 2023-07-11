import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const EditarPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchTask();
  }, []);

  // Função para buscar a tarefa a ser editada
  const fetchTask = async () => {
    try {
      const response = await fetch(`http://localhost:3000/task/${id}`);
      const data = await response.json();

      if (response.ok) {
        setTitle(data.title); // Define o título da tarefa
        setTask(data.task); // Define a descrição da tarefa
        setStatus(data.status); // Define o status da tarefa
      } else {
        console.log("Erro ao buscar tarefa:", data);
      }
    } catch (error) {
      console.log("Erro ao buscar tarefa", error);
    }
  };

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

  // Função para exibir a mensagem de sucesso com um tempo limite
  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  // Função para exibir a mensagem de erro com um tempo limite
  const showErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  };

  // Função para lidar com o envio do formulário de edição
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação dos campos
    if (title.trim() === "" || task.trim() === "" || status === "") {
      showErrorMessage("Os campos não podem estar vazios.");
      return;
    }

    const updatedTask = {
      title: title,
      task: task,
      status: status,
    };

    try {
      // Envio da requisição PUT para atualizar a tarefa
      const response = await fetch(`http://localhost:3000/task/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      if (response.status === 200) {
        showSuccessMessage("Tarefa editada com sucesso.");
        window.location.href = "/tarefas"; // Redireciona para a página de tarefas após a atualização
      } else {
        showErrorMessage("Erro ao editar tarefa.");
      }
    } catch (error) {
      showErrorMessage("Erro ao editar tarefa: " + error.message);
    }
  };

  return (
    <div>
      <h2>Editar Tarefa</h2>
      <Link to="/">
        <button className="btn-cadastro">Menu</button>
      </Link>
      <div>
        <Link to="/tarefas">
          <button className="btn-cadastro">Tarefas cadastradas</button>
        </Link>
      </div>

      <form className="container" onSubmit={handleSubmit}>
        {/* Exibe a mensagem de sucesso, se existir */}
        {successMessage && (
          <p className="success-message">{successMessage}</p>
        )}
        {/* Exibe a mensagem de erro, se existir */}
        {errorMessage && (
          <p className="error-message">{errorMessage}</p>
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
          <option value="">Selecione o status</option>
          <option value="listadas">Listadas</option>
          <option value="iniciadas">Iniciadas</option>
          <option value="finalizadas">Finalizadas</option>
        </select>

        <button className="btn-cadastro" type="submit">
          Atualizar
        </button>
      </form>
    </div>
  );
};

export default EditarPage;
