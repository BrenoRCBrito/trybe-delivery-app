/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.jsx'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      backgroundColor: ['focus'],
      colors: {
        trybeDarkGreen: '#036B52',
        trybeLightGreen: '#2FC18C',
        trybeBlue: '#056CF9',
        trybePurple: '#421981',
        pending: '#D3C63C',
        orderCardBg: '#B1C2BE',
      },
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
