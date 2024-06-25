'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';
import { type DialogStore, createDialogStore } from './store';

type DialogStoreApi = ReturnType<typeof createDialogStore>;

const DialogStoreContext = createContext<DialogStoreApi | undefined>(undefined);

type DialogStoreProviderProps = {
  children: ReactNode;
};

export const DialogStoreProvider = ({ children }: DialogStoreProviderProps) => {
  const storeRef = useRef<DialogStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createDialogStore();
  }

  return (
    <DialogStoreContext.Provider value={storeRef.current}>
      {children}
    </DialogStoreContext.Provider>
  );
};

export const useDialogStore = <T = DialogStore,>(
  selector: (store: DialogStore) => T = (state) => state as T,
): T => {
  const dialogStoreContext = useContext(DialogStoreContext);

  if (!dialogStoreContext) {
    throw new Error(`useDialogStore must be used within DialogStoreProvider`);
  }

  return useStore(dialogStoreContext, selector);
};
