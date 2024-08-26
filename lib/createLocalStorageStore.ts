import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type LocalStorageState<T> = {
  data: Record<string, T>;
  get: (key: string) => T | undefined;
  set: (key: string, value: T) => void;
};

// Utility function to get initial state from local storage or initialize with an empty object
const getInitialState = <T>(key: string): Record<string, T> => {
  const storedValue = localStorage.getItem(key);

  if (!storedValue) {
    localStorage.setItem(key, JSON.stringify({}));
    return {};
  }

  return (JSON.parse(storedValue) as Record<string, T>) ?? {};
};

/**
 * Create a zustand store that persists to local storage
 */
export const createLocalStorageStore = <T>(key: string) => {
  return create<LocalStorageState<T>>()(
    persist(
      (set, get) => ({
        data: getInitialState<T>(key),
        get: (key) => get().data[key],
        set: (key, value) =>
          set((state) => ({
            data: { ...state.data, [key]: value },
          })),
      }),
      {
        name: key, // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => localStorage), // you can switch to sessionStorage if needed
      },
    ),
  );
};

export type LocalStorageStore<T> = LocalStorageState<T>;
