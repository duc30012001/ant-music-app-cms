import type { Config } from 'tailwindcss';
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './modules/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-open-sans)', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#1E79E4',
        'text-color': '#57606f',
        'title-color': '#2f3542',
        'des-color': '#6e7c89',
        background: '#f5f8fd',
        // bg: '#fdfdfd',
        bg: '#fff',
      },
    },
  },
  plugins: [],
};
export default config;
