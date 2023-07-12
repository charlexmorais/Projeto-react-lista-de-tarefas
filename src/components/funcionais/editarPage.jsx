import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";

const EditarPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isFetching, setIsFetching] = useState(false); // Verificar se a busca está em andamento

  useEffect(() => {
    fetchTask();
  }, []);

  // Busca a tarefa com base no ID
  const fetchTask = async () => {
    if (title || task || status) {
      return;
    }

    setIsFetching(true);

    try {
      const response = await fetch(`http://localhost:3000/task/${id}`);
      const data = await response.json();

      if (response.ok) {
        setTitle(data.title);
        setTask(data.task);
        setStatus(data.status);
      } else {
        console.log("Erro ao buscar tarefa:", data);
      }
    } catch (error) {
      console.log("Erro ao buscar tarefa:", error);
    } finally {
      setIsFetching(false);
    }
  };

  // Atualiza o valor do campo de título
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Atualiza o valor do campo de descrição
  const handleChange = (e) => {
    setTask(e.target.value);
  };

  // Atualiza o valor do campo de status
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  // Exibe a mensagem de sucesso por um tempo limitado
  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  };

  // Exibe a mensagem de erro por um tempo limitado
  const showErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  };

  // Manipula o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se os campos estão preenchidos
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
      const response = await fetch(`http://localhost:3000/task/${id}`, {
        method: "PUT", // atualizando tarefa 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      if (response.status === 200) {
        const successMessage = "Tarefa editada com sucesso.";
        showSuccessMessage(successMessage);
        setTimeout(() => {
        showSuccessMessage()
        navigate("/tarefas")
        }, 1000);
      } else {
        showErrorMessage("Erro ao editar tarefa.");
      }
    } catch (error) {
      showErrorMessage("Erro ao editar tarefa: " + error.message);
    }
  };

 //para exibir a mensagem de sucesso e redirecionar /tarefas tarefa atualizada
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const successMsg = searchParams.get("success");
    if (successMsg) {
      setSuccessMessage(successMsg);
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/tarefas");
      }, 5000);
    }
  }, [location.search, navigate]);

  return (
    <div>
      <h2>Editar Tarefa</h2>
      <div>
        <Link to="/">
          <button className="btn-cadastro">Menu</button>
        </Link>
      </div>
      <div>
        <Link to="/tarefas">
          <button className="btn-cadastro">Tarefas cadastradas</button>
        </Link>
      </div>
      {/* // envio de formulario  */}

      <form className="container" onSubmit={handleSubmit}>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

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

        <button className="btn-cadastro" type="submit" disabled={isFetching}>
          {isFetching ? "Aguarde..." : "Atualizar"}
        </button>
      </form>
    </div>
  );
};

export default EditarPage;
