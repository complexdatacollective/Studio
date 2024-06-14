import { useAtom } from 'jotai';
import { useState, useCallback, useOptimistic, useEffect } from 'react';
import { dataAtomFamily } from './_atoms';
import { hash } from 'ohash';

export const useGlobalOptimistic = <State, Action>(
  initialState: State,
  reducer: (state: State, action: Action) => State,
): [State, (action: Action) => void] => {
  const [optimisticState, addOptimistic] = useOptimistic(initialState, reducer);

  // When optimistic state updates, sync it to our Jotai atom
  const [data, setData] = useAtom(dataAtomFamily({ key: 'todoStore' }));

  useEffect(() => {
    if (hash(optimisticState) !== hash(data)) {
      console.log('syncing data', { data, optimisticState });
      setData(optimisticState);
    }
  }, [optimisticState, setData, data]);

  return [optimisticState, addOptimistic];
};

export const useGlobalOptimisticValue = () => {
  const [data] = useAtom(dataAtomFamily({ key: 'todoStore' }));
  return data;
};
