import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const EditarPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const [status, setStatus] = useState(""); // Estado para controlar o status selecionado

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {  
    // Função para buscar a tarefa a ser editada
    try {
      const response = await fetch(`http://localhost:3000/task/${id}`);
      const data = await response.json();

      if (response.ok) {
        setTitle(data.title); // Define o título da tarefa
        setTask(data.task); // Define a descrição da tarefa
        setStatus(data.status); // Define o status da tarefa
      } else {
        console.log("Error ao buscar tarefa:", data); // erro caso a busca falhe
      }
    } catch (error) {
      console.log("Erro ao buscar tarefa", error); // erro caso a busca falhe
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value); // Atualiza o estado do título com o valor do campo de título
  };

  const handleChange = (e) => {
    setTask(e.target.value); // Atualiza o estado da descrição com o valor do campo de descrição
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value); // Atualiza o estado do status com o valor do campo de status
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim() === "" || task.trim() === "" || status === "") {
      console.log("Os campos não podem estar vazios."); // Validação dos campos
      return;
    }

    const updatedTask = {
      title: title,
      task: task,
      status: status, 
    };

    try {
      const response = await fetch(`http://localhost:3000/task/${id}`, {
        // Envio da requisição PUT para atualizar a tarefa
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        window.location.href = "/tarefas"; // Redireciona para a página de tarefas após a atualização
      } else {
        console.log("Error ao buscar tarefa:", response); // erro caso a atualização falhe
      }
    } catch (error) {
      console.log("Error ao buscar tarefa", error); // erro caso ocorra uma exceção
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
