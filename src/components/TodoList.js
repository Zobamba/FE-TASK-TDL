import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = () => {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Load tasks from local storage when the component mounts
    const storedItems = JSON.parse(localStorage.getItem('todoItems')) || [];
    setItems(storedItems);
  }, []);

  useEffect(() => {
    // Save tasks to local storage whenever items change
    localStorage.setItem('todoItems', JSON.stringify(items));
  }, [items]);

  const calculateDueDate = () => {
    const now = new Date();
    now.setHours(now.getHours() + 48); // Due in 48 hours
    return now.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  };

  // Add new todo
  const addItem = () => {
    if (!newItem) {
      alert("Enter an item...");
      return;
    }
    const item = {
      id: Date.now(),
      value: newItem,
      completed: false,
      dueDate: calculateDueDate(), // Add a due date when creating a new item
    }

    setItems(oldItems => [...oldItems, item]);
    setNewItem("");
  }

  // Delete todo
  const deleteItem = (id) => {
    const newArray = items.filter(item => item.id !== id);
    setItems(newArray);
  }

  // Set item to completed or not on toggle
  const toggleCompleted = (id) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setItems(updatedItems);
  };

  // drag-and-drop functionality to reorder tasks
  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>MY TODO LIST</h1>
        <input
          type="text"
          className="add-item"
          placeholder='Add an item...'
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
        />
        <button className="addBtn" onClick={() => addItem()}>Add</button>
      </div>

      <ul id="myUL">
        {items.map((item, index) => (
          <li key={item.id}>
            <TodoItem
              item={item}
              index={index}
              moveItem={moveItem}
              deleteItem={deleteItem}
              toggleCompleted={toggleCompleted}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList;
