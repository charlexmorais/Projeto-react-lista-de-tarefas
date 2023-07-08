import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./homePage";
import CadastroPage from "./cadastro.Page";
import EditarPage from "./editarPage";
import "./paginas.css";
import Menu from "./menu";
const TaskList = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/tarefas" element={<HomePage />} />
          <Route path="/tarefas/cadastro" element={<CadastroPage />} />
          <Route path="/tarefas/editar/:id" element={<EditarPage />} />{" "}
        </Routes>
      </div>
    </Router>
  );
};

export default TaskList;
