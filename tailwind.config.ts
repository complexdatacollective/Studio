import type { Config } from "tailwindcss";

import twForms from "@tailwindcss/forms";
import colors from "tailwindcss/colors";

import { dynamicTwClasses } from "~/lib/dynamic-theme/twPlugin";

const config: Config = {
  content: ['./(app|lib|components|stories)/**/*.{js,ts,jsx,tsx}'],
  darkMode: "class",
  plugins: [twForms],
  theme: {
    extend: {
      colors: {
        primary: dynamicTwClasses("primary", 255),
        secondary: dynamicTwClasses("secondary", 370),
        success: {
          DEFAULT: colors.green[500],
          foreground: colors.green[50],
          ...colors.green,
        },
        danger: {
          DEFAULT: colors.red[500],
          foreground: colors.red[50],
          ...colors.red,
        },
      },
    },
  },
};

export default config;