import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CadastroPage from "./cadastro.Page";
import EditarPage from "./editarPage";
import "/src/css/paginas.css";
import Menu from "./menu";
import Filter from "./filter";
const TaskList = () => {
  // Lista de tarefas
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/tarefas" element={<Filter />} />
          <Route path="/tarefas/cadastro" element={<CadastroPage />} />
          <Route path="/tarefas/editar/:id" element={<EditarPage />} />{" "}
        </Routes>
      </div>
    </Router>
  );
};

export default TaskList;
