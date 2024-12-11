import React, { useEffect, useState } from 'react';
import NewTodo from '../newTodo';
import Todo from '../todo';
import './todolist.css';
import { getTasks } from '../../api';
import { useNavigate } from 'react-router-dom';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  const filteredAndSortedTodos = (completed) =>
    todos
      .filter((todo) => todo.completed === completed)
      .sort((a, b) =>
        a.dueDate && b.dueDate ? new Date(a.dueDate) - new Date(b.dueDate) : 0
      );

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { data } = await getTasks();
        setTodos(data);
      } catch (err) {
        console.log(err);
        navigate('/');
      }
    };
    fetchTodos();
  }, []);

  return (
    <div className="todo-container">
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
