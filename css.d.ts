/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
/* eslint-disable @typescript-eslint/consistent-type-definitions */

declare module 'csstype' {
  interface Properties {
    // For now, allow any CSS Custom Properties. In future, specify which
    // theme properties are allowed.
    [index: `--${string}`]: string | number;
  }
}
