import React from "react";
import { Link } from "react-router-dom";
import "/src/css/paginas.css";


function Menu() {
  return (
    <div className="menu-container">
      <div className="background-image"></div>
      <div className="content">
        <h1>Bem-vindo ao gerenciador de tarefas!</h1> {/* Título principal */}
        <h3>Cadastre a sua tarefa abaixo</h3> {/* Subtítulo */}
        
        <Link to="/tarefas/cadastro" className="btn-cadastro"> {/* Link para a página de cadastro */}
          <button id="tarefas-cadastradas" className="btn-cadastro">Cadastrar</button> {/* Botão de cadastro */}
        </Link>
        
        <div>
          <Link to="/tarefas"> {/* Link para a página de tarefas cadastradas */}
            <button className="btn-cadastro">Tarefas cadastradas</button> {/* Botão para visualizar tarefas cadastradas */}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Menu;
