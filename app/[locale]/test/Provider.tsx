'use client';

import {
  createContext,
  use,
  useContext,
  useOptimistic,
  type ReactNode,
} from 'react';

type DataContextType<T extends Record<string | number | symbol, unknown>> = {
  optimisticData: T[];
  setOptimisticData: (item: T) => void;
};

export type WithPendingState<T> = T & { pending: boolean };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DataContext = createContext<DataContextType<any> | undefined>(
  undefined,
);

export default function DataContextProvider<
  T extends Record<string | number | symbol, unknown>,
>({
  children,
  dataPromise,
}: {
  children: ReactNode;
  dataPromise: Promise<T[]>;
}) {
  const data = use(dataPromise);

  const [optimisticData, setOptimisticData] = useOptimistic(data);

  return (
    <DataContext.Provider value={{ optimisticData, setOptimisticData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useDataContext<
  T extends Record<string | number | symbol, unknown>,
>() {
  const context = useContext(DataContext);

  if (context === undefined) {
    throw new Error('useDataContext must be used within a DataContextProvider');
  }

  const addOptimisticItem = (item: T) => {
    context.setOptimisticData((prev) => [...prev, { ...item, pending: true }]);
  };

  const deleteOptimisticItem = (id: number) => {
    context.setOptimisticData((prev) => {
      const index = prev.findIndex((item) => item.id === id);
      if (index === -1) {
        return prev; // item not found, return previous state
      }

      const deletedItem = prev[index];
      const newData = [...prev];
      newData.splice(index, 1, { ...deletedItem, pending: true }); // return pending true to visualize the optimistic deletion

      return newData;
    });
  };

  const updateOptimisticItem = (item: T) => {
    context.setOptimisticData((prev) => {
      const index = prev.findIndex((prevItem) => prevItem.id === item.id);
      if (index === -1) {
        return prev; // item not found, return previous state
      }

      const newData = [...prev];
      newData.splice(index, 1, { ...item, pending: true }); // return pending true to visualize the optimistic update

      return newData;
    });
  };

  return [
    context.optimisticData as DataContextType<
      WithPendingState<T>
    >['optimisticData'],
    addOptimisticItem,
    deleteOptimisticItem,
    updateOptimisticItem,
  ] as const;
}
