import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import useTodos from '../../customHooks/useTodo';
import TodoTabs from './todoTabs';
import TabSwitcher from './tabSwitcher';
import TodoContainer from './todoContainer';
import './todolist.css';

const TodoList = () => {
  const [activeTab, setActiveTab] = useState('todo');
  const navigate = useNavigate();
  const { isDemo, demoTasks, setDemoTasks } = useDemo();

  const { tasks, updateTasks, loading } = useTodos(
    isDemo,
    demoTasks,
    setDemoTasks
  );

  const pendingTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <TodoTabs
        activeTab={activeTab}
        taskCount={
          activeTab === 'todo' ? pendingTasks.length : completedTasks.length
        }
        isDemo={isDemo}
        tasks={tasks}
        setTasks={updateTasks}
      />

      <TabSwitcher
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingCount={pendingTasks.length}
        completedCount={completedTasks.length}
      />

      <TodoContainer
        tasks={tasks}
        setTasks={updateTasks}
        isCompleted={activeTab === 'completed'}
        isDemo={isDemo}
      />
    </>
  );
};

export default TodoList;
