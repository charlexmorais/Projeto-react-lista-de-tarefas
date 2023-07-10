import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "/src/css/paginas.css";
import "/src/css/homePage.css";



const HomePage = () => {
  // Estados
  const [tasks, setTasks] = useState([]); // Lista de tarefas
  const [filter, setFilter] = useState(""); // Valor do filtro de busca
  const [filteredTasks, setFilteredTasks] = useState([]); // Lista de tarefas filtradas
  const [errorMessage, setErrorMessage] = useState(""); // Mensagem de erro

  useEffect(() => {
    fetchTasks(); // Buscar as tarefas ao carregar a página
  }, []);

  // Função para buscar as tarefas
  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/task"); // Faz a requisição para buscar as tarefas
      const data = await response.json(); // Converte a resposta para JSON

      if (response.ok) {
        setTasks(data); // Atualiza a lista de tarefas
        setFilteredTasks(data); // Define as tarefas filtradas inicialmente como todas as tarefas
      } else {
        console.log("Erro ao buscar tarefas:", data); //  erro caso a busca falhe
      }
    } catch (error) {
      console.log("Erro ao buscar tarefas:", error); //  erro caso ocorra uma exceção
    }
  };

  // Função para lidar com a alteração do filtro de busca
  const handleFilterChange = (event) => {
    setFilter(event.target.value); // Atualiza o valor do filtro de busca
  };

  // Função para lidar com a tecla Enter no campo de filtro de busca
  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch(tasks); // Executa a busca ao pressionar Enter
    }
  };

  // Função para realizar a busca das tarefas
  const handleSearch = async (tasksToSearch) => {
    if (filter.trim() === "") {
      setErrorMessage("Campo de filtro vazio."); // Define a mensagem de erro se o filtro estiver vazio
      return;
    }

    setErrorMessage(""); // Limpa a mensagem de erro
    const filtered = tasksToSearch.filter((task) =>
      task.title.toLowerCase().includes(filter.toLowerCase())
    ); // Filtra as tarefas com base no título, ignorando maiúsculas e minúsculas
    setFilteredTasks(filtered); // Atualiza a lista de tarefas filtradas
    if (filtered.length > 0) {
      const taskId = filtered[0].id;
      await fetchTaskById(taskId); // Busca detalhes da primeira tarefa filtrada
    }
  };

  // Função para buscar detalhes de uma tarefa específica pelo ID
  const fetchTaskById = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3000/task/${taskId}`);
      const data = await response.json();

      if (response.ok) {
        console.log("Tarefa encontrada !:", data); // Log de sucesso ao encontrar a tarefa
      } else {
        console.log("Erro ao buscar tarefa:", data); // Log de erro caso a busca falhe
      }
    } catch (error) {
      console.log("Erro ao buscar tarefa::", error); // Log de erro caso ocorra uma exceção
    }
  };

  // Função para deletar uma tarefa
  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3000/task/${taskId}`, {
        method: "DELETE", // Método DELETE para remover a tarefa
      });

      if (response.ok) {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks); // Atualiza a lista de tarefas removendo a tarefa deletada
        setFilteredTasks(updatedTasks); // Atualiza a lista de tarefas filtradas removendo a tarefa deletada
      } else {
        console.log("Erro ao deletar tarefa:"); // Log de erro caso a remoção falhe
      }
    } catch (error) {
      console.log("Erro ao deletar tarefa:", error); // Log de erro caso ocorra uma exceção
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
            <button className="btn-excluir" onClick={() => deleteTask(task.id)}>
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
