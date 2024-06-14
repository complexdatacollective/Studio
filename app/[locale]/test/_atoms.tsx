// atoms.ts
import { type Atom, atom } from 'jotai';
import { atomFamily } from 'jotai/utils';

export const dataAtomFamily = atomFamily<{ key: string }, Atom<unknown[]>>(
  () => {
    return atom([]);
  },
  (a, b) => a.key === b.key,
);
