import React from "react";
import { Link } from "react-router-dom";
import "./paginas.css";

function Menu() {
  return (
    <div className="menu-container">
      <div className="background-image"></div>
      <div className="content">
        <h1>Bem-vindo ao gerenciador de tarefas!</h1>
        <h3>Cadastre a sua tarefa abaixo</h3>

        <Link to="/tarefas/cadastro" className="btn-cadastro">
          <button id="tarefas-cadastradas" className="btn-cadastro">Cadastrar</button>
        </Link>

        <div>
          <Link to="/tarefas">
            <button className="btn-cadastro">Tarefas cadastradas</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Menu;

