import React, { useState } from 'react';
import TodoItem from '../todoItem';
import { FiInbox } from 'react-icons/fi';
import AuthPrompt from '../common/AuthPrompt';
import './todo.css';

const Todo = ({ filteredAndSortedTodos, setTodos, isCompleted, isDemo }) => {
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  const handleAction = (action) => {
    if (isDemo) {
      setShowAuthPrompt(true);
      return false; // Prevent the action
    }
    return true; // Allow the action
  };

  const todos = filteredAndSortedTodos(isCompleted);

  return (
    <div className="todo-list-wrapper">
      {showAuthPrompt && (
        <AuthPrompt onClose={() => setShowAuthPrompt(false)} />
      )}

      {todos.length === 0 ? (
        <div className="empty-state">
          <FiInbox className="empty-icon" />
          <p className="empty-text">
            {isCompleted
              ? "You haven't completed any tasks yet"
              : "You don't have any tasks yet"}
          </p>
        </div>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              setTodos={setTodos}
              onActionAttempt={handleAction}
              isDemo={isDemo}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Todo;
