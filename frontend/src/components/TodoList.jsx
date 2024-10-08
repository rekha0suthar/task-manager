import React, { useEffect, useState } from 'react';
import NewTodo from './NewTodo';
import Todo from './Todo';
import '../css/todolist.css';
const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const filteredAndSortedTodos = (completed) =>
    todos
      .filter((todo) => todo.completed === completed)
      .sort((a, b) =>
        a.dueDate && b.dueDate ? new Date(a.dueDate) - new Date(b.dueDate) : 0
      );

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch('http://localhost:5000/api/todos');
      const data = await response.json();
      setTodos(data);
    };
    fetchTodos();
  }, []);

  return (
    <div className="todo-container">
      <h1>Task Management</h1>

      {/* New Todo Input Section */}
      <div className="todo">
        <NewTodo todos={todos} setTodos={setTodos} />
      </div>

      <div className="todo-list-wrapper">
        {/* Incompleted Tasks */}
        <div className="list">
          <h2>Incomplete Tasks: ({filteredAndSortedTodos(false).length})</h2>

          {/* List Incomplete Todos */}
          <Todo
            filteredAndSortedTodos={filteredAndSortedTodos}
            setTodos={setTodos}
            isCompleted={false}
          />
        </div>

        {/* Completed Tasks */}
        <div className="list">
          <h2>Completed Tasks: ({filteredAndSortedTodos(true).length})</h2>
          <Todo
            filteredAndSortedTodos={filteredAndSortedTodos}
            setTodos={setTodos}
            isCompleted={true}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoList;
