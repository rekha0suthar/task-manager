import React, { useEffect, useState } from 'react';
import NewTodo from '../newTodo';
import Todo from '../todo';
import './todolist.css';
import { getTasks } from '../../api';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiClock, FiMenu, FiX, FiUser } from 'react-icons/fi';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [activeTab, setActiveTab] = useState('todo');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
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
    <>
      <div className="dashboard-header">
        <div className="header-content">
          <h2>{activeTab === 'todo' ? 'My Tasks' : 'Completed Tasks'}</h2>
          <p className="subtitle">
            {activeTab === 'todo'
              ? `You have ${filteredAndSortedTodos(false).length} pending tasks`
              : `You have completed ${
                  filteredAndSortedTodos(true).length
                } tasks`}
          </p>
        </div>
        {activeTab === 'todo' && (
          <div className="new-task-wrapper">
            <NewTodo todos={todos} setTodos={setTodos} />
          </div>
        )}
      </div>
      <div className="task-tabs">
        <button
          className={`tab-btn ${activeTab === 'todo' ? 'active' : ''}`}
          onClick={() => setActiveTab('todo')}
        >
          <FiClock className="tab-icon" />
          <span>Tasks</span>
          <span className="task-count">
            {filteredAndSortedTodos(false).length}
          </span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          <FiCheckCircle className="tab-icon" />
          <span>Completed</span>
          <span className="task-count">
            {filteredAndSortedTodos(true).length}
          </span>
        </button>
      </div>

      <div className="tasks-container">
        <Todo
          filteredAndSortedTodos={filteredAndSortedTodos}
          setTodos={setTodos}
          isCompleted={activeTab === 'completed'}
        />
      </div>
    </>
  );
};

export default TodoList;
