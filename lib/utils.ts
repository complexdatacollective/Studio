import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * TS Util that allows array.includes to be used as a type guard
 * with read only arrays ('as const' arrays).
 */
export function isIn<T>(values: readonly T[], x: any): x is T {
  return values.includes(x);
}
