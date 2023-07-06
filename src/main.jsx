// Arquivo main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';

 import TaskList from './components/funcionais/TaskPage';

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <React.StrictMode>
    <TaskList />
  </React.StrictMode>
);
