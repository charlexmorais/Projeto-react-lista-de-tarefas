import React from "react";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <div>
      <h1>Bem-vindo ao gerenciador de tarefas!</h1>
      <h2>Cadastre a sua tarefa abaixo</h2>
      <Link to="/tarefas/cadastro" className="btn-cadastro">
        <button id="tarefas-cadastradas" className="btn-cadastro">cadastrar</button>
      </Link>
      <div>
      <Link to="/tarefas" >
        <button className="btn-cadastro">Tarefas cadastradas</button>
      </Link>
      </div>
      
    </div>
  );
}

export default Menu;
