import { useCallback } from "react";
import { useSetDraft, useTrackedState } from "../store";

export const useQuery = () => {
  const state = useTrackedState();
  const getQuery = () => state.query;
  const setDraft = useSetDraft();
  const setQuery = useCallback(
    (query) => {
      setDraft((draft) => {
        draft.query = query;
      });
    },
    [setDraft]
  );
  return { getQuery, setQuery };
};
