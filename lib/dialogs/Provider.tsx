'use client';

import { createContext, type ReactNode, useContext, useRef } from 'react';
import {
  createDialogStore,
  type DialogStore,
  type DialogStoreApi,
} from './store';
import { useStore } from 'zustand';
import { DialogRenderer } from './DialogRenderer';

export const DialogStoreContext = createContext<DialogStoreApi | undefined>(
  undefined,
);

export type DialogStoreProviderProps = {
  children: ReactNode;
};

export const DialogStoreProvider = ({ children }: DialogStoreProviderProps) => {
  const storeRef = useRef<DialogStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createDialogStore();
  }

  return (
    <DialogStoreContext.Provider value={storeRef.current}>
      <DialogRenderer />
      {children}
    </DialogStoreContext.Provider>
  );
};

export const useDialogStore = <T extends DialogStore>(
  selector?: (store: DialogStore) => T,
) => {
  const dialogStoreContext = useContext(DialogStoreContext);

  if (!dialogStoreContext) {
    throw new Error(`useDialogStore must be used within DialogStoreProvider`);
  }

  const selectorWithDefault = selector ?? ((store) => store);

  return useStore(dialogStoreContext, selectorWithDefault);
};
