/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.jsx'],
  theme: {
    extend: {
      backgroundColor: ['focus'],
    },
    boxShadow: {
      login: '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
    },
  },
  variants: {
    extends: {
      backgroundColor: ['focus'],
    },
  },
  plugins: [],
};
