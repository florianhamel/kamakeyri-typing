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
        'primary': '#c196f9',
        'secondary': '#96f9c1',
        'tertiary': '#f9c196',
        'tertiary-light': '#fef7f2'
      }
    },
  },
  plugins: [],
};
