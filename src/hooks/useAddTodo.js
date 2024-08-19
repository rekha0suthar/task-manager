import { useCallback } from 'react';
import { useSetDraft } from '../store';

let nextId = 100;

export const useAddTodo = () => {
  const setDraft = useSetDraft();
  return useCallback(
    (title) => {
      setDraft((draft) => {
        draft.todos.push({ id: nextId++, title, completed: false });
      });
    },
    [setDraft]
  );
};
