import React, { useState } from 'react';
import './newtodo.css';
import { addTask, getTasks } from '../../api';
import { FiCalendar, FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';

const NewTodo = ({ todos, setTodos }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const fetchTodos = async () => {
    try {
      const { data } = await getTasks();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    // Show success toast immediately
    toast.success('Task added successfully! ✨', {
      duration: 2000,
      position: 'top-right',
      style: {
        background: '#10B981',
        color: '#fff',
        padding: '16px',
        borderRadius: '10px',
      },
      className: 'toast-animation',
    });

    // Optimistically update UI
    const newTask = { title, dueDate, completed: false };
    setTodos((prevTodos) => [...prevTodos, { ...newTask, id: Date.now() }]);

    // Clear inputs immediately
    setTitle('');
    setDueDate('');
    setIsDatePickerVisible(false);

    try {
      await addTask(newTask);
      await fetchTodos(); // Get the real data from server
    } catch (error) {
      toast.error('Failed to add task', {
        style: {
          background: '#EF4444',
          color: '#fff',
          padding: '16px',
          borderRadius: '10px',
        },
        className: 'toast-animation',
      });
      console.error('Error creating todo:', error);
      await fetchTodos(); // Revert to server state if error
    }
  };

  return (
    <form onSubmit={handleSubmit} className="new-todo-form">
      <div className="input-group">
        <input
          type="text"
          value={title}
          placeholder="Add a new task..."
          onChange={(e) => setTitle(e.target.value)}
          className="todo-input"
        />
        <div className="form-actions">
          <button
            type="button"
            className="date-picker-btn"
            onClick={() => setIsDatePickerVisible(!isDatePickerVisible)}
          >
            <FiCalendar />
          </button>
          <button type="submit" className="add-btn" disabled={!title.trim()}>
            <FiPlus />
          </button>
        </div>
      </div>

      {isDatePickerVisible && (
        <div className="date-picker-wrapper">
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="date-input"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
      )}
    </form>
  );
};

export default React.memo(NewTodo);
