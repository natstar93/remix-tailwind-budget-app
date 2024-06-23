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
        'brand-light': '#a2e79a',
        'brand-lighter': '#d2f3cc',
        'brand-dark': '#47bd44',
        'brand-darker': '#284426'
      },
    },
  },
  plugins: [],
} satisfies Config;
