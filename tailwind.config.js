/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    fontFamily: {
      sans: ['Noto Sans'],
      mono: ['Noto Sans Mono']
    },
    extend: {
      colors: {
        'kw-white': '#fff',
        'kw-black': '#000',
        'tertiary-light': '#fef7f2',
        primary: '#c196f9',
        secondary: '#96f9c1',
        tertiary: '#f9c196'
      },
      boxShadow: {
        'kw-sm': '5px 5px 0 rgb(0, 0, 0 / 0.4)',
        kw: '10px 10px 0 rgb(0, 0, 0 / 0.4)'
      },
      borderRadius: {
        xs: '2px'
      }
    }
  },
  plugins: []
};
