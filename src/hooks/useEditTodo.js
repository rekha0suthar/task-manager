import { useCallback } from 'react';
import { useSetDraft } from '../store';

export const useEditTodo = () => {
  const setDraft = useSetDraft();
  return useCallback(
    (id, newTitle) => {
      // Mutation version
      setDraft((draft) => {
        const index = draft.todos.findIndex((todo) => todo.id === id);
        if (index >= 0) draft.todos[index].title = newTitle; // Update the title
      });
    },
    [setDraft]
  );
};
