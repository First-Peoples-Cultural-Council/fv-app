/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        width: 'width',
        height: 'height',
        padding: 'padding',
      },
      fontFamily: {
        sans: ['BCSans', 'sans-serif'],
      },
      fontSize: {
        '20xl': '15rem',
      },
      colors: {
        'color-primary-0': '#264753',
        'color-primary-1': '#597883',
        'color-primary-2': '#3B5E6B',
        'color-primary-3': '#163845',
        'color-primary-4': '#08242F',
        'color-secondary-0': '#8E3720',
        'color-secondary-1': '#E59782',
        'color-secondary-2': '#B86048',
        'color-secondary-3': '#651A06',
        'color-secondary-4': '#3E0D00',
        'color-tertiary-0': '#54584A',
        'color-tertiary-1': '#ABB19D',
        'color-tertiary-2': '#808572',
        'color-tertiary-3': '#272B20',
        'color-tertiary-4': '#272E16',
        'color-words-light': '#2A9D8F',
        'color-words-dark': '#057266',
        'color-shuffle-light': '#513B56',
        'color-shuffle-dark': '#4A2954',
        'color-phrases-light': '#C37829',
        'color-phrases-dark': '#753C00',
        'color-alphabet-light': '#830042',
        'color-alphabet-dark': '#420022',
        'color-categories-light': '#E9C46A',
        'color-categories-dark': '#A37D21',
        'color-profile-light': '#D6D3D1',
        'color-profile-dark': '#898886',
        'color-main-header': '#737274',
      },
      maxHeight: {
        'calc-245': 'calc(100vh - 245px)',
        'calc-195': 'calc(100vh - 195px)',
        'calc-185': 'calc(100vh - 185px)',
        'calc-125': 'calc(100vh - 125px)',
      },
    },
  },
  plugins: [],
};
