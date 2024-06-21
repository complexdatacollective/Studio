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
  addOptimisticItem: (item: T) => void;
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

  const [optimisticData, addOptimisticItem] = useOptimistic(
    data,
    (state: T[], newItem: T) => {
      return [...state, { ...newItem, pending: true }];
    },
  );

  return (
    <DataContext.Provider value={{ optimisticData, addOptimisticItem }}>
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
  return [
    context.optimisticData as DataContextType<
      WithPendingState<T>
    >['optimisticData'],
    context.addOptimisticItem as DataContextType<T>['addOptimisticItem'],
  ] as const;
}
