import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./homePage";
import CadastroPage from "./cadastro.Page";
import EditarPage from "./editarPage";

const TaskList = () => {
  return (
    <Router>
      <div>
        <h1>Minhas Tarefas</h1>
        <Routes>
          <Route path="/tarefas" element={<HomePage />} />
          <Route path="/tarefas/cadastro" element={<CadastroPage />} />
          <Route path="/tarefas/editar/:id" element={<EditarPage />} /> {/* Rota para a página de edição com o parâmetro ID */}
        </Routes>
      </div>
    </Router>
  );
};

export default TaskList;
