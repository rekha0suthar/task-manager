import React from 'react';
import TodoItem from '../todoItem';
import { FiInbox } from 'react-icons/fi';
import './todo.css';

const Todo = ({ filteredAndSortedTodos, setTodos, isCompleted }) => {
  const todos = filteredAndSortedTodos(isCompleted);

  return (
    <div className="todo-list-wrapper">
      {todos.length > 0 ? (
        <ul className="todo-list">
          {todos.map(({ _id, title, completed, dueDate }) => (
            <TodoItem
              key={_id}
              id={_id}
              title={title}
              completed={completed}
              dueDate={dueDate}
              setTodos={setTodos}
            />
          ))}
        </ul>
      ) : (
        <div className="empty-state">
          <FiInbox className="empty-icon" />
          <p className="empty-text">
            {isCompleted
              ? "You haven't completed any tasks yet"
              : 'No tasks to show. Add a new task to get started!'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Todo;
