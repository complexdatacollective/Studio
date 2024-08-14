export const THEME_COOKIE_NAME = 'theme-choice';
export const DARK_MODE_COOKIE_NAME = 'theme-dark-mode';

export const THEMES = {
  default: {
    '--background': 'var(--platinum)',
  },
  architect: {
    '--background': 'var(--neon-coral)',
  },
  interviewer: {
    '--background': 'var(--cyber-grape)',
  },
} as const;

export type Theme = keyof typeof THEMES;
