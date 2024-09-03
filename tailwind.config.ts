import { type Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

/**
 * Export any values that we need to access from JS here.
 */
export const breakpoints = defaultTheme.screens;

export default {
  darkMode: ['selector', '[data-mode="dark"]'],
  content: ['./(app|components|lib)/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      body: ['var(--font-family-body)'],
      heading: ['var(--font-family-heading)'],
      mono: ['var(--font-family-mono)'],
    },
    fontSize: {
      'xs': ['var(--font-size-xs)', '1.5'],
      'sm': ['var(--font-size-sm)', '1.5'],
      'base-sm': ['var(--font-size-base-sm)', '1.5'],
      'base': ['var(--font-size-base)', '1.5'],
      'lg': ['var(--font-size-lg)', '1.5'],
      'xl': ['var(--font-size-xl)', '1.4'],
      '2xl': ['var(--font-size-2xl)', '1.2'],
      '3xl': ['var(--font-size-3xl)', '1.2'],
      '4xl': ['var(--font-size-4xl)', '1.15'],
      '5xl': ['var(--font-size-5xl)', '1.1'],
      '6xl': ['var(--font-size-6xl)', '1.1'],
    },
    fontWeight: {
      light: '260',
      normal: '330',
      bold: '400',
      extrabold: '540',
    },
    colors: {
      'transparent': 'transparent',

      'background': 'oklch(var(--background) / <alpha-value>)',
      'foreground': 'oklch(var(--foreground) / <alpha-value>)',
      'default': {
        DEFAULT: 'oklch(var(--default) / <alpha-value>)',
        foreground: 'oklch(var(--default-foreground) / <alpha-value>)',
      },
      'primary': {
        DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
        foreground: 'oklch(var(--primary-foreground) / <alpha-value>)',
      },
      'accent': {
        DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
        foreground: 'oklch(var(--accent-foreground) / <alpha-value>)',
      },
      'destructive': {
        DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
        foreground: 'oklch(var(--destructive-foreground) / <alpha-value>)',
      },
      'success': {
        DEFAULT: 'oklch(var(--success) / <alpha-value>)',
        foreground: 'oklch(var(--success-foreground) / <alpha-value>)',
      },
      'info': {
        DEFAULT: 'oklch(var(--info) / <alpha-value>)',
        foreground: 'oklch(var(--info-foreground) / <alpha-value>)',
      },
      'muted': {
        DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
        foreground: 'oklch(var(--muted-foreground) / <alpha-value>)',
      },
      'surface-0': {
        DEFAULT: 'oklch(var(--surface-0) / <alpha-value>)',
        foreground: 'oklch(var(--surface-0-foreground) / <alpha-value>)',
      },
      'surface-1': {
        DEFAULT: 'oklch(var(--surface-1) / <alpha-value>)',
        foreground: 'oklch(var(--surface-1-foreground) / <alpha-value>)',
      },

      'surface-2': {
        DEFAULT: 'oklch(var(--surface-2) / <alpha-value>)',
        foreground: 'oklch(var(--surface-2-foreground) / <alpha-value>)',
      },

      'surface-3': {
        DEFAULT: 'oklch(var(--surface-3) / <alpha-value>)',
        foreground: 'oklch(var(--surface-3-foreground) / <alpha-value>)',
      },

      'surface-4': {
        DEFAULT: 'oklch(var(--surface-4) / <alpha-value>)',
        foreground: 'oklch(var(--surface-4-foreground) / <alpha-value>)',
      },

      'input': {
        DEFAULT: 'oklch(var(--input) / <alpha-value>)',
        foreground: 'oklch(var(--input-foreground) / <alpha-value>)',
      },

      'border': {
        DEFAULT: 'oklch(var(--border-color) / <alpha-value>)',
      },

      'overlay': 'oklch(var(--overlay) / <alpha-value>)',

      'focus': 'oklch(var(--focus) / <alpha-value>)',

      // Sequences
      'node': {
        '1': 'oklch(var(--seq-node-1) / <alpha-value>)',
        '2': 'oklch(var(--seq-node-2) / <alpha-value>)',
        '3': 'oklch(var(--seq-node-3) / <alpha-value>)',
        '4': 'oklch(var(--seq-node-4) / <alpha-value>)',
        '5': 'oklch(var(--seq-node-5) / <alpha-value>)',
        '6': 'oklch(var(--seq-node-6) / <alpha-value>)',
        '7': 'oklch(var(--seq-node-7) / <alpha-value>)',
        '8': 'oklch(var(--seq-node-8) / <alpha-value>)',
      },

      'edge': {
        '1': 'oklch(var(--seq-edge-1) / <alpha-value>)',
        '2': 'oklch(var(--seq-edge-2) / <alpha-value>)',
        '3': 'oklch(var(--seq-edge-3) / <alpha-value>)',
        '4': 'oklch(var(--seq-edge-4) / <alpha-value>)',
        '5': 'oklch(var(--seq-edge-5) / <alpha-value>)',
        '6': 'oklch(var(--seq-edge-6) / <alpha-value>)',
        '7': 'oklch(var(--seq-edge-7) / <alpha-value>)',
        '8': 'oklch(var(--seq-edge-8) / <alpha-value>)',
        '9': 'oklch(var(--seq-edge-9) / <alpha-value>)',
        '10': 'oklch(var(--seq-edge-10) / <alpha-value>)',
      },

      'cat': {
        '1': 'oklch(var(--seq-cat-1) / <alpha-value>)',
        '2': 'oklch(var(--seq-cat-2) / <alpha-value>)',
        '3': 'oklch(var(--seq-cat-3) / <alpha-value>)',
        '4': 'oklch(var(--seq-cat-4) / <alpha-value>)',
        '5': 'oklch(var(--seq-cat-5) / <alpha-value>)',
        '6': 'oklch(var(--seq-cat-6) / <alpha-value>)',
        '7': 'oklch(var(--seq-cat-7) / <alpha-value>)',
        '8': 'oklch(var(--seq-cat-8) / <alpha-value>)',
        '9': 'oklch(var(--seq-cat-9) / <alpha-value>)',
        '10': 'oklch(var(--seq-cat-10) / <alpha-value>)',
      },

      'ord': {
        '1': 'oklch(var(--seq-ord-1) / <alpha-value>)',
        '2': 'oklch(var(--seq-ord-2) / <alpha-value>)',
        '3': 'oklch(var(--seq-ord-3) / <alpha-value>)',
        '4': 'oklch(var(--seq-ord-4) / <alpha-value>)',
        '5': 'oklch(var(--seq-ord-5) / <alpha-value>)',
        '6': 'oklch(var(--seq-ord-6) / <alpha-value>)',
        '7': 'oklch(var(--seq-ord-7) / <alpha-value>)',
        '8': 'oklch(var(--seq-ord-8) / <alpha-value>)',
      },

      'panel': {
        '1': 'oklch(var(--seq-panel-1) / <alpha-value>)',
        '2': 'oklch(var(--seq-panel-2) / <alpha-value>)',
      },
    },
    borderRadius: {
      none: '0',
      small: 'calc(var(--border-radius) / 2)',
      DEFAULT: 'var(--border-radius)',
      large: 'calc(var(--border-radius) * 1.5)',
      full: '9999px',
    },
    screens: breakpoints,
    extend: {
      backdropBlur: {
        xs: '3px',
      },
      keyframes: {
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'indeterminate-progress-bar': {
          '0%': { transform: ' translateX(-200%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        'background-gradient': {
          '0%, 50%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'shake': {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        },
        'pulse-bg': {
          '0%': { backgroundColor: 'var(--tw-gradient-from)' },
          '50%': { backgroundColor: 'var(--tw-gradient-to)' },
          '100%': { backgroundColor: 'var(--tw-gradient-from)' },
        },
        'nudge': {
          '0%': {
            boxShadow: '0 0 0 0 oklch(var(--success) / 0.8)',
          },

          '70%': {
            boxShadow: '0 0 0 2rem oklch(var(--success) / 0)',
          },

          '100%': {
            boxShadow: '0 0 0 0 oklch(var(--success) / 0)',
          },
        },
        'slideDownAndFade': {
          from: { opacity: '0', transform: 'translateY(-4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slideLeftAndFade': {
          from: { opacity: '0', transform: 'translateX(4px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'slideUpAndFade': {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slideRightAndFade': {
          from: { opacity: '0', transform: 'translateX(-4px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'shake': 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'indeterminate-progress-bar':
          'indeterminate-progress-bar 1s infinite linear',
        'background-gradient': 'background-gradient 5s infinite ease-in-out',
        'pulse-bg': 'pulse-bg 1s infinite',
        'nudge': 'nudge 2s infinite',
        'slideDownAndFade': 'slideDownAndFade 1s cubic-bezier(0.16, 1, 0.3, 1)',
        'slideLeftAndFade': 'slideLeftAndFade 1s cubic-bezier(0.16, 1, 0.3, 1)',
        'slideUpAndFade': 'slideUpAndFade 1s cubic-bezier(0.16, 1, 0.3, 1)',
        'slideRightAndFade':
          'slideRightAndFade 1s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transformOrigin: {
        'left-right': '0% 50%',
      },
    },
  },

  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
  ],
} satisfies Config;
