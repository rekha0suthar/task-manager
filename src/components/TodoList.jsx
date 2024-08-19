import React from 'react';
import TodoItem from './TodoItem';
import NewTodo from './NewTodo';
import { useQuery } from '../hooks/useQuery';
import { useTodoList } from '../hooks/useTodoList';

const TodoList = () => {
  const { getQuery, setQuery } = useQuery();
  const todos = useTodoList();
  return (
    <div className="todo-container">
      <h1>Task Management</h1>
      <div className="todo">
        <NewTodo />
      </div>

      <div>
        <h2>Incompleted Tasks</h2>

        <ul>
          <div className="highlight-wrapper">
            <p>Highlight Tasks:</p>{' '}
            <input
              value={getQuery()}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for incompleted todos"
            />
          </div>
          {todos
            .filter((todo) => {
              return todo.completed === false;
            })
            .map(({ id, title, completed }) => (
              <TodoItem key={id} id={id} title={title} completed={completed} />
            ))}
        </ul>
      </div>
      <div>
        <h2>Completed Tasks</h2>
        <ul>
          {todos
            .filter((todo) => {
              return todo.completed === true;
            })
            .map(({ id, title, completed }) => (
              <TodoItem key={id} id={id} title={title} completed={completed} />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
