import { updateTaskApi, deleteTaskApi } from '../api';
import { showErrorToast, showSuccessToast } from '../utils/toastUtils';

const useTodoActions = ({ todo, setTodos, onActionAttempt, isDemo }) => {
  const updateTitle = async (newTitle) => {
    if (!onActionAttempt('update')) return;

    try {
      if (!isDemo) {
        await updateTaskApi(todo._id, { title: newTitle });
        showSuccessToast('Task updated successfully');
      }
      setTodos((prev) =>
        prev.map((t) => (t._id === todo._id ? { ...t, title: newTitle } : t))
      );
    } catch (err) {
      console.error(err);
      showErrorToast('Failed to update task');
    }
  };

  const toggleComplete = async () => {
    if (!onActionAttempt('complete')) return;

    try {
      if (!isDemo) {
        await updateTaskApi(todo._id, { completed: !todo.completed });
      }
      setTodos((prev) =>
        prev.map((t) =>
          t._id === todo._id ? { ...t, completed: !t.completed } : t
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const removeTask = async () => {
    if (!onActionAttempt('delete')) return;

    try {
      if (!isDemo) {
        await deleteTaskApi(todo._id);
        showSuccessToast('Task deleted successfully');
      }
      setTodos((prev) => prev.filter((t) => t._id !== todo._id));
    } catch (err) {
      console.error(err);
      showErrorToast('Failed to delete task');
    }
  };

  return { updateTitle, toggleComplete, removeTask };
};

export default useTodoActions;
