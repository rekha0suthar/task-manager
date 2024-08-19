import { useTrackedState } from "../store";

export const useTodoList = () => {
  const state = useTrackedState();
  return state.todos;
};
