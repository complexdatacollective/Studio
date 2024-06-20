'use client';

import {
  createContext,
  useContext,
  useOptimistic,
  type ReactNode,
} from 'react';

type DataContextType<T> = {
  optimisticData: T[];
  addOptimisticItem: (item: T) => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DataContext = createContext<DataContextType<any> | undefined>(
  undefined,
);

export default function DataContextProvider<T>({
  children,
  data,
}: {
  children: ReactNode;
  data: T[];
}) {
  const [optimisticData, addOptimisticItem] = useOptimistic(
    data,
    (state: T[], newItem: T) => {
      return [...state, newItem];
    },
  );

  return (
    <DataContext.Provider value={{ optimisticData, addOptimisticItem }}>
      {children}
    </DataContext.Provider>
  );
}

export function useDataContext<T>() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useDataContext must be used within a DataContextProvider');
  }
  return context as DataContextType<T>;
}
