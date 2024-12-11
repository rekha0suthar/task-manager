import React, { useState } from 'react';
import './newtodo.css';
import { addTask } from '../../api';

const NewTodo = ({ todos, setTodos }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState();

  const addTodo = async (newTodo) => {
    const { data } = await addTask(newTodo);
    setTodos([...todos, data]);
  };

  const handleTodo = (e) => {
    e.preventDefault();

    if (title.trim()) {
      const newTodo = { title, dueDate };
      addTodo(newTodo);
      setTitle('');
      setDueDate('');
      setDueDate(null);
    }
  };

  return (
    <form onSubmit={handleTodo}>
      <input
        type="text"
        value={title}
        placeholder="Enter task ....."
        onChange={(e) => setTitle(e.target.value)}
      />
      {/* Icon to trigger calendar */}

      <input
        type="date"
        value={dueDate}
        onChange={(e) => {
          setDueDate(e.target.value);
        }}
      />
      <button type="submit" className="add-btn">
        +
      </button>
    </form>
  );
};

export default React.memo(NewTodo);
