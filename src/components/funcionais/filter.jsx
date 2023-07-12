import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "/src/css/paginas.css";
import "/src/css/homePage.css";

const Filter= () => {
  const [tasks, setTasks] = useState([]); // Armazena todas as tarefas
  const [filter, setFilter] = useState(""); // Armazena o valor do campo de filtro
  const [filteredTasks, setFilteredTasks] = useState([]); // Armazena as tarefas filtradas
  const [errorMessage, setErrorMessage] = useState(""); // Armazena a mensagem de erro

  useEffect(() => {
    fetchTasks();
  }, []);

  // Busca as tarefas exibi quando clicar em ver tarefas adicionadas
  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/task");
      const data = await response.json();

      if (response.ok) {
        setTasks(data);
        setFilteredTasks(data);
      } else {
        throw new Error("Erro ao buscar tarefas");
      }
    } catch (error) {
      console.log("Erro ao buscar tarefas:", error);
    }
  };

  // Atualiza o valor do filtro conforme o usuário digita
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Executa a busca quando a tecla Enter é pressionada no campo de filtro
  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch(tasks);
    }
  };

  // Realiza a busca com base no filtro digitado
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
    if (filtered.length === 0) {
      setErrorMessage("Nenhuma tarefa encontrada.");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  // Exclui uma tarefa pelo ID
  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3000/task/${taskId}`, {
        method: "DELETE",
      });

      if (response.status === 204) {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks);
        setErrorMessage("Tarefa excluída com sucesso.");
        setTimeout(() => {
          setErrorMessage("");
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

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const successMessage = searchParams.get("success");

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
      {/* // card de exibicao */}
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

export default Filter;

