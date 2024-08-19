import { useCallback } from 'react';
import { useSetDraft } from '../store';

export const useDeleteTodo = () => {
  const setDraft = useSetDraft();
  return useCallback(
    (id) => {
      //Mutation version
      setDraft((draft) => {
        const index = draft.todos.findIndex((todo) => todo.id === id);
        if (index >= 0) draft.todos.splice(index, 1);
      });
    },
    [setDraft]
  );
};
