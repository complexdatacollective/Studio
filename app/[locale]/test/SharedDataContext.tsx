import { type ReactNode, Suspense } from 'react';
import DataContextProvider from './Provider';

/**
 * RSC that wraps children in a DataContextProvider initialized with the given
 * data query.
 */
export default function CreateDataContext<
  T extends Record<string | number | symbol, unknown>[],
>({ query, children }: { query: () => Promise<T>; children: ReactNode }) {
  const queryPromise = query();

  return (
    <Suspense fallback="Loading...">
      <DataContextProvider dataPromise={queryPromise}>
        {children}
      </DataContextProvider>
    </Suspense>
  );
}
