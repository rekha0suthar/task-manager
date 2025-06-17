import { useEffect, useState } from 'react';
import taskService from '../services/todoService';

const useTodos = (isDemo, demoTasks, setDemoTasks) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    if (!isDemo) {
      setLoading(true);
      try {
        const data = await taskService.getAll();
        setTodos(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [isDemo]);

  const tasks = isDemo ? demoTasks : todos;
  const updateTasks = isDemo ? setDemoTasks : setTodos;

  return { tasks, updateTasks, loading };
};

export default useTodos;
