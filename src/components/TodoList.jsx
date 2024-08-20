import React from 'react';
import TodoItem from './TodoItem';
import NewTodo from './NewTodo';
import { useQuery } from '../hooks/useQuery';
import { useTodoList } from '../hooks/useTodoList';

const TodoList = () => {
  const { getQuery, setQuery } = useQuery();
  const todos = useTodoList();

  const filteredAndSortedTodos = (completed) =>
    todos
      .filter((todo) => todo.completed === completed)
      .sort((a, b) =>
        a.dueDate && b.dueDate ? new Date(a.dueDate) - new Date(b.dueDate) : 0
      );

  return (
    <div className="todo-container">
      <h1>Task Management</h1>

      {/* New Todo Input Section */}
      <div className="todo">
        <NewTodo />
      </div>

      {/* Incompleted Tasks */}
      <div>
        <h2>Incomplete Tasks</h2>

        {/* Search/Highlight Tasks */}
        <div className="highlight-wrapper">
          <p>Highlight Tasks:</p>
          <input
            value={getQuery()}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for incomplete tasks"
          />
        </div>

        {/* List Incomplete Todos */}
        <ul>
          {filteredAndSortedTodos(false).map(
            ({ id, title, completed, dueDate }) => (
              <TodoItem
                key={id}
                id={id}
                title={title}
                completed={completed}
                dueDate={
                  dueDate
                    ? new Date(dueDate).toLocaleDateString()
                    : 'No due date'
                } // Format dueDate
              />
            )
          )}
        </ul>
      </div>

      {/* Completed Tasks */}
      <div>
        <h2>Completed Tasks</h2>
        <ul>
          {filteredAndSortedTodos(true).map(
            ({ id, title, completed, dueDate }) => (
              <TodoItem
                key={id}
                id={id}
                title={title}
                completed={completed}
                dueDate={
                  dueDate
                    ? new Date(dueDate).toLocaleDateString()
                    : 'No due date'
                } // Format dueDate}
              />
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
