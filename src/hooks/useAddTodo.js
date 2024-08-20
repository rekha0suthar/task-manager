import { useCallback } from 'react';
import { useSetDraft } from '../store';

let nextId = 100; // Simulated unique ID generation

export const useAddTodo = () => {
  const setDraft = useSetDraft();
  return useCallback(
    ({ title, dueDate = null }) => {
      setDraft((draft) => {
        draft.todos.push({
          id: nextId++,
          title,
          completed: false,
          dueDate, // The due date will be null if not provided
        });
      });
    },
    [setDraft]
  );
};
