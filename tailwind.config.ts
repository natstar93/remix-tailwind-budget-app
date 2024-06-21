import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.tsx'],
  darkMode: 'selector',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Proxima Nova', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        'brand-green': '#6bd968',
      },
    },
  },
  plugins: [],
} satisfies Config;
