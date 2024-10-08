import React from 'react';
import TodoItem from './TodoItem';

const Todo = ({ filteredAndSortedTodos, setTodos, isCompleted }) => {
  return (
    <ul>
      {filteredAndSortedTodos(isCompleted).length > 0 ? (
        filteredAndSortedTodos(isCompleted).map(
          ({ id, title, completed, dueDate }) => (
            <TodoItem
              key={id}
              id={id}
              title={title}
              completed={completed}
              dueDate={
                dueDate ? new Date(dueDate).toLocaleDateString() : 'No due date'
              } // Format dueDate
              setTodos={setTodos}
            />
          )
        )
      ) : (
        <p>No Pending Tasks</p>
      )}
    </ul>
  );
};

export default Todo;
