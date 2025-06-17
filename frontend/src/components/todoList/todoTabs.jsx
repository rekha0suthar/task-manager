import React from 'react';
import NewTodo from '../newTodo';
import './todolist.css';

const TodoTabs = ({ activeTab, taskCount, isDemo, tasks, setTasks }) => (
  <div className="dashboard-header">
    <div className="header-content">
      <h2>{activeTab === 'todo' ? 'My Tasks' : 'Completed Tasks'}</h2>
      <p className="subtitle">
        {activeTab === 'todo'
          ? `You have ${taskCount} pending tasks`
          : `You have completed ${taskCount} tasks`}
      </p>
    </div>
    {activeTab === 'todo' && (
      <div className="new-task-wrapper">
        <NewTodo todos={tasks} setTodos={setTasks} />
      </div>
    )}
  </div>
);

export default TodoTabs;
