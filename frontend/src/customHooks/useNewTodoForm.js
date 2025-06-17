import { useState } from 'react';
import { addTaskApi } from '../api';
import { showSuccessToast, showErrorToast } from '../utils/toastUtils';

const useNewTodoForm = ({ setTodos, isDemo }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  const handleAddTask = async (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    const tempId = `demo-${Date.now()}`;
    const newTask = {
      _id: isDemo ? tempId : null,
      title: trimmed,
      dueDate,
      completed: false,
    };

    // Optimistic UI
    showSuccessToast('Task added successfully! ✨');
    setTodos((prev) => [...prev, newTask]);

    // Reset form
    setTitle('');
    setDueDate('');
    setIsDatePickerVisible(false);

    if (!isDemo) {
      try {
        const { data } = await addTaskApi(newTask);
        setTodos((prev) =>
          prev.map((todo) => (todo._id === newTask._id ? data : todo))
        );
      } catch (err) {
        setTodos((prev) => prev.filter((todo) => todo._id !== newTask._id));
        showErrorToast('Failed to add task');
      }
    }
  };

  return {
    title,
    dueDate,
    isDatePickerVisible,
    showAuthPrompt,
    setTitle,
    setDueDate,
    setIsDatePickerVisible,
    setShowAuthPrompt,
    handleAddTask,
  };
};

export default useNewTodoForm;
