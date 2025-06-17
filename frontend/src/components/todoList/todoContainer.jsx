import React from 'react';
import Todo from '../todo';

const TodoContainer = ({ tasks, setTasks, isCompleted, isDemo }) => {
  const filteredAndSortedTodos = tasks
    .filter((todo) => todo.completed === isCompleted)
    .sort((a, b) =>
      a.dueDate && b.dueDate ? new Date(a.dueDate) - new Date(b.dueDate) : 0
    );

  return (
    <div className="tasks-container">
      <Todo
        filteredAndSortedTodos={() => filteredAndSortedTodos}
        setTodos={setTasks}
        isCompleted={isCompleted}
        isDemo={isDemo}
      />
    </div>
  );
};

export default TodoContainer;
