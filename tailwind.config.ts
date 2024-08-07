import { type Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./(app|lib|components)/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      // ----------------------------
      // Special one-off colors
      // ----------------------------

      transparent: 'transparent',
      white: 'hsl(100 100% 100% / <alpha-value>)',
      black: 'hsl(0 0% 0% / <alpha-value>)',

      // ----------------------------
      // Semantic colors

      primary: {
        DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
        foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
      },
      secondary: {
        DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
        foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
        foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
      },
      success: {
        DEFAULT: 'hsl(var(--success) / <alpha-value>)',
        foreground: 'hsl(var(--success-foreground) / <alpha-value>)',
      },
      info: {
        DEFAULT: 'hsl(var(--info) / <alpha-value>)',
        foreground: 'hsl(var(--info-foreground) / <alpha-value>)',
      },
      muted: {
        DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
        foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
      },
      accent: {
        DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
        foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
      },
      popover: {
        DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
        foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
      },
      card: {
        DEFAULT: 'hsl(var(--card) / <alpha-value>)',
        foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
      },
      panel: {
        DEFAULT: 'hsl(var(--panel) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
      },
      input: {
        DEFAULT: 'hsl(var(--input) / <alpha-value>)',
        foreground: 'hsl(var(--input-foreground) / <alpha-value>)',
      },
      border: 'hsl(var(--border) / <alpha-value>)',
      link: 'hsl(var(--link) / <alpha-value>)',

      focus: 'hsl(var(--focus) / <alpha-value>)',

      // ----------------------------
      // Sequences
      // Used for situations where we want to show a sequence of colors, such
      // as node types, categorical bins etc
      // ----------------------------

      nodeSequence: {
        1: 'hsl(var(--node-sequence-1) / <alpha-value>)',
        2: 'hsl(var(--node-sequence-2) / <alpha-value>)',
        3: 'hsl(var(--node-sequence-3) / <alpha-value>)',
        4: 'hsl(var(--node-sequence-4) / <alpha-value>)',
      },
    },
    borderRadius: {
      ...defaultTheme.borderRadius,
      input: defaultTheme.borderRadius.xl,
    },
    extend: {
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
          '0%': { transform: ' translateX(0) scaleX(0)' },
          '40%': { transform: 'translateX(0) scaleX(0.4)' },
          '100%': { transform: 'translateX(100%) scaleX(0.5)' },
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
        'pulse-bg': 'pulse-bg 1.5s infinite',
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
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
  ],
} satisfies Config;
