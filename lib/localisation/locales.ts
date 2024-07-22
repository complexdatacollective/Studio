// ! Remember to modify the middleware.ts file as you add or remove locales here
export const SUPPORTED_LOCALES = ['en', 'es'] as const;

export type Locales = (typeof SUPPORTED_LOCALES)[number];
