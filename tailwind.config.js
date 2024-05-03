const colors = require('tailwindcss/colors');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
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
        'color-songs-light': '#830042',
        'color-songs-dark': '#420022',
        'color-stories-light': '#E9C46A',
        'color-stories-dark': '#A37D21',
        'color-flashcards-light': '#513B56',
        'color-flashcards-dark': '#4A2954',
        'color-profile-light': '#D6D3D1',
        'color-profile-dark': '#898886',
        'color-main-header': '#313133',
        highlight: '#0585ff',
        // Dark Blue
        primary: {
          light: '#44677E',
          DEFAULT: '#264653',
          dark: '#1b313a',
        },
        // Dark Orange
        secondary: {
          light: '#b07363',
          DEFAULT: '#8E3720',
          dark: '#632716',
        },
        // Purple
        tertiaryA: {
          light: '#857689',
          DEFAULT: '#513B56',
          dark: '#39293c',
        },
        // Green/Grey
        tertiaryB: {
          light: '#878a80',
          DEFAULT: '#54584A',
          dark: '#3b3e34',
        },
        // Yellow/Orange Accent - e.g. Stats WIdget
        tertiaryC: {
          DEFAULT: '#EFAD1A',
        },
        // Grey/Blue background - eg. landing banner
        tertiaryD: {
          DEFAULT: '#2D5B72',
        },
        word: {
          light: '#6ABAB1',
          DEFAULT: '#2A9D8F',
          dark: '#1D6E64',
        },
        phrase: {
          light: '#D5A169',
          DEFAULT: '#C37829',
          dark: '#89541D',
        },
        song: {
          light: '#a84d7b',
          DEFAULT: '#830042',
          dark: '#5c002e',
        },
        story: {
          light: '#f0d697',
          DEFAULT: '#E9C46A',
          dark: '#a3894a',
        },
        wordText: {
          DEFAULT: '#264653',
        },
        phraseText: {
          DEFAULT: '#9A270A',
        },
        songText: {
          DEFAULT: '#830042',
        },
        storyText: {
          DEFAULT: '#8C5822',
        },
        bgGreen: {
          DEFAULT: '#2C876D',
        },
        bgRed: {
          DEFAULT: '#B40212',
        },
        'fv-charcoal': {
          xlight: '#979799',
          light: '#54584A',
          DEFAULT: '#313133',
          dark: '#0f0f10',
        },
        'wordsy-correct': {
          DEFAULT: '#2C876D', // as bgGreen
        },
        'wordsy-present': {
          DEFAULT: '#C37829', // as phrase
        },
        gray: colors.stone,
      },
      maxHeight: {
        'calc-245': 'calc(100vh - 245px)',
        'calc-195': 'calc(100vh - 195px)',
        'calc-185': 'calc(100vh - 185px)',
        'calc-125': 'calc(100vh - 125px)',
      },
      animation: {
        'pulse-blur': 'pulse-blur 2.5s linear infinite',
      },
      keyframes: {
        'pulse-blur': {
          '0%, 50%, 100%': {
            transform: 'scale(1)',
            filter: 'blur(0px)',
          },
          '25%': {
            transform: 'scale(0.6)',
            filter: 'blur(2px)',
          },
          '75%': {
            transform: 'scale(1.4)',
            filter: 'blur(2px)',
          },
        },
      },
    },
  },
  plugins: [],
};
