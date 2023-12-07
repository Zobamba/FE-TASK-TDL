import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Routes>
        <Route path="/" element={<TodoList />} />
      </Routes>
    </DndProvider>
  );
}

export default App;
