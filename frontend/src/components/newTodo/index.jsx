import React from 'react';
import './newtodo.css';
import { FiCalendar, FiPlus } from 'react-icons/fi';
import AuthPrompt from '../common/AuthPrompt';
import useNewTodoForm from '../../customHooks/useNewTodoForm';

const NewTodo = ({ todos, setTodos, isDemo }) => {
  const {
    title,
    dueDate,
    isDatePickerVisible,
    showAuthPrompt,
    setTitle,
    setDueDate,
    setIsDatePickerVisible,
    setShowAuthPrompt,
    handleAddTask,
  } = useNewTodoForm({ todos, setTodos, isDemo });

  return (
    <>
      {showAuthPrompt && (
        <AuthPrompt onClose={() => setShowAuthPrompt(false)} />
      )}

      <form onSubmit={handleAddTask} className="new-todo-form">
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
              aria-label="Toggle date picker"
            >
              <FiCalendar />
            </button>
            <button
              type="submit"
              className="add-btn"
              disabled={!title.trim()}
              aria-label="Add task"
            >
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
