import React, { useState } from 'react';
import './newtodo.css';
import { addTask } from '../../api';
import { FiCalendar, FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import AuthPrompt from '../common/AuthPrompt';

const NewTodo = ({ todos, setTodos, isDemo }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    // Create new task object
    const newTask = {
      _id: isDemo ? `demo-${Date.now()}` : null, // Generate temporary ID for demo
      title: title.trim(),
      dueDate,
      completed: false,
    };

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
    setTodos((prevTodos) => [...prevTodos, newTask]);

    // Clear inputs immediately
    setTitle('');
    setDueDate('');
    setIsDatePickerVisible(false);

    if (!isDemo) {
      try {
        const { data } = await addTask(newTask);
        // Update with real data from server
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo._id === newTask._id ? data : todo))
        );
      } catch (error) {
        // Revert on error
        setTodos((prevTodos) =>
          prevTodos.filter((todo) => todo._id !== newTask._id)
        );
        toast.error('Failed to add task', {
          style: {
            background: '#EF4444',
            color: '#fff',
            padding: '16px',
            borderRadius: '10px',
          },
          className: 'toast-animation',
        });
      }
    }
  };

  return (
    <>
      {showAuthPrompt && (
        <AuthPrompt onClose={() => setShowAuthPrompt(false)} />
      )}
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
    </>
  );
};

export default React.memo(NewTodo);
