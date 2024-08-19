import { produce } from 'immer';
import { useCallback, useState } from 'react';
import { createContainer } from 'react-tracked';

const initialState = {
  todos: [
    { id: 1, title: 'Yoga', completed: true },
    { id: 2, title: 'Breakfast', completed: false },
    { id: 3, title: 'Study', completed: false },
    { id: 4, title: 'Work', completed: true },
    { id: 5, title: 'Project', completed: false },
  ],
  query: '',
};

const useValue = () => useState(initialState);

const {
  Provider,
  useTrackedState,
  useUpdate: useSetState,
} = createContainer(useValue);

const useSetDraft = () => {
  const setState = useSetState();
  return useCallback(
    (draftUpdater) => {
      setState(produce(draftUpdater));
    },
    [setState]
  );
};

export { Provider, useTrackedState, useSetDraft };
