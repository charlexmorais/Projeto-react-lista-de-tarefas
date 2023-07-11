import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "/src/css/paginas.css";
import "/src/css/homePage.css";

const HomePage = () => {
  const [tasks, setTasks] = useState([]); // Armazena todas as tarefas
  const [filter, setFilter] = useState(""); // Armazena o valor do campo de filtro
  const [filteredTasks, setFilteredTasks] = useState([]); // Armazena as tarefas filtradas
  const [errorMessage, setErrorMessage] = useState(""); // Armazena a mensagem de erro
  const [successMessage, setSuccessMessage] = useState(""); // Armazena a mensagem de sucesso

  useEffect(() => {
    fetchTasks();
  }, []);

  // Função assíncrona para buscar as tarefas iniciais
  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/task");
      const data = await response.json();

      if (response.ok) {
        setTasks(data);
        setFilteredTasks(data);
      } else {
        console.log("Erro ao buscar tarefas:", data);
      }
    } catch (error) {
      console.log("Erro ao buscar tarefas:", error);
    }
  };

  // Atualiza o valor do filtro conforme o usuário digita
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Função para lidar com a tecla Enter pressionada no campo de filtro
  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch(tasks);
    }
  };

  // Função para realizar a busca com base no filtro digitado
  const handleSearch = async (tasksToSearch) => {
    if (filter.trim() === "") {
      setErrorMessage("Campo de filtro vazio.");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }

    setErrorMessage("");
    const filtered = tasksToSearch.filter((task) =>
      task.title.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredTasks(filtered);
    if (filtered.length > 0) {
      const taskId = filtered[0].id;
      await fetchTaskById(taskId);
    } else {
      setErrorMessage("Nenhuma tarefa encontrada.");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  // Função para buscar uma tarefa específica pelo ID
  const fetchTaskById = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3000/task/${taskId}`);
      const data = await response.json();

      if (response.ok) {
        console.log("Tarefa encontrada:", data);
        setSuccessMessage("Tarefa encontrada com sucesso.");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        console.log("Erro ao buscar tarefa:", data);
      }
    } catch (error) {
      console.log("Erro ao buscar tarefa:", error);
    }
  };

  // Função para excluir uma tarefa pelo ID
  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3000/task/${taskId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks);
        setSuccessMessage("Tarefa excluída com sucesso.");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        setErrorMessage("Erro ao deletar tarefa.");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      }
    } catch (error) {
      setErrorMessage("Erro ao deletar tarefa:", error);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
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
        <button className="btn-search" onClick={() => handleSearch(tasks)}>
          Buscar
        </button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <Link to="/">
        <button className="btn-cadastro">Menu</button>
      </Link>

      {filteredTasks.map((task) => (
        <div key={task.id} className="task-card">
          <h4>TÍTULO:</h4> <p>{task.title}</p>
          <h4>DESCRIÇÃO:</h4>
          <p>{task.task}</p>
          <h4>STATUS: </h4>
          <p>{task.status}</p>
          <div className="button-container">
            <Link to={`/tarefas/editar/${task.id}`}>
              <button className="btn-editar">Editar</button>
            </Link>
            <button
              className="btn-excluir"
              onClick={() => deleteTask(task.id)}
            >
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
