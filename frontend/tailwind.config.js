/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['Bebas Neue'],
        monomaniac: ['Monomaniac One'],
        aoboshi: ['Aoboshi One'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [ 
      'lofi',
      'luxury',
      {
        custom: {
          "neutral": "#ffffff",
        }
      },
    ],
  },
};
