import { type Config } from 'tailwindcss';

export default {
  darkMode: ['selector', '[data-mode="dark"]'],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './lib/interviewer/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      body: ['var(--font-family-body)'],
      heading: ['var(--font-family-heading)'],
      mono: ['var(--font-family-mono)'],
    },
    fontSize: {
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

      'surface-1': {
        DEFAULT: 'oklch(var(--surface-1-bg) / <alpha-value>)',
        foreground: 'oklch(var(--surface-1-fg) / <alpha-value>)',
      },

      'surface-2': {
        DEFAULT: 'oklch(var(--surface-2-bg) / <alpha-value>)',
        foreground: 'oklch(var(--surface-2-fg) / <alpha-value>)',
      },

      'surface-3': {
        DEFAULT: 'oklch(var(--surface-3-bg) / <alpha-value>)',
        foreground: 'oklch(var(--surface-3-fg) / <alpha-value>)',
      },

      'surface-4': {
        DEFAULT: 'oklch(var(--surface-4-bg) / <alpha-value>)',
        foreground: 'oklch(var(--surface-4-fg) / <alpha-value>)',
      },

      'input': {
        DEFAULT: 'oklch(var(--input) / <alpha-value>)',
        foreground: 'oklch(var(--input-foreground) / <alpha-value>)',
      },

      'border': {
        DEFAULT: 'oklch(var(--border-color) / <alpha-value>)',
      },

      'link': 'oklch(var(--link) / <alpha-value>)',

      'focus': 'oklch(var(--focus) / <alpha-value>)',
    },
    borderRadius: {
      none: '0',
      small: 'calc(var(--border-radius) / 2)',
      DEFAULT: 'var(--border-radius)',
      large: 'calc(var(--border-radius) * 1.5)',
      full: '9999px',
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
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
  ],
} satisfies Config;
