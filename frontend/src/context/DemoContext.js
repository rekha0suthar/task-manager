import React, { createContext, useContext, useState } from 'react';

const DemoContext = createContext();

const dummyTasks = [
  {
    _id: '1',
    title: 'Welcome to Taskify! 👋',
    completed: false,
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: '2',
    title: 'Try adding a new task ➕',
    completed: false,
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: '3',
    title: 'Mark tasks as complete ✅',
    completed: true,
    dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: '4',
    title: 'Edit task titles by clicking them ✏️',
    completed: false,
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const dummyUser = {
  _id: 'demo',
  firstName: 'Demo',
  lastName: 'User',
  email: 'demo@example.com',
};

export const DemoProvider = ({ children }) => {
  const [isDemo, setIsDemo] = useState(false);
  const [demoTasks, setDemoTasks] = useState(dummyTasks);

  const startDemo = () => {
    setIsDemo(true);
    setDemoTasks(dummyTasks);
  };

  const endDemo = () => {
    setIsDemo(false);
    setDemoTasks(dummyTasks);
  };

  return (
    <DemoContext.Provider
      value={{ isDemo, demoTasks, setDemoTasks, startDemo, endDemo, dummyUser }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => useContext(DemoContext);
