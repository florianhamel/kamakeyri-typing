/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    fontFamily: {
      sans: ['Noto Sans'],
      mono: ['Noto Sans Mono']
    },
    extend: {
      colors: {
        primary: '#9B75CB',
        secondary: '#75CB9B',
        tertiary: '#CB9B75',
      }
    },
  },
  plugins: [],
};
