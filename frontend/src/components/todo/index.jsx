import React from 'react';
import TodoItem from '../todoItem';

const Todo = ({ filteredAndSortedTodos, setTodos, isCompleted }) => {
  return (
    <ul>
      {filteredAndSortedTodos(isCompleted).length > 0 ? (
        filteredAndSortedTodos(isCompleted).map(
          ({ _id, title, completed, dueDate }) => (
            <TodoItem
              key={_id}
              id={_id}
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
        <p className="dummy-text">No Pending Tasks</p>
      )}
    </ul>
  );
};

export default Todo;
