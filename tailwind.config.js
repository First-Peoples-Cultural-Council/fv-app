const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  safelist: [
    {
      pattern:
        /(bg|border|from|to|text)-(word|phrase|song|story|tertiaryA|tertiaryB|tertiaryC)-(100|200|300|400|500|600|700|800)/,
      variants: ['hover'],
    },
  ],
  theme: {
    extend: {
      transitionProperty: {
        width: 'width',
        height: 'height',
        padding: 'padding',
      },
      fontFamily: {
        sans: ['BCSans', ...defaultTheme.fontFamily.sans],
        serif: [...defaultTheme.fontFamily.serif],
        mono: [...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        '20xl': '15rem',
      },
      colors: {
        // Dark Blue
        primary: {
          100: '#3196a9',
          200: '#2b798f',
          300: '#296475',
          400: '#295361',
          500: '#264653',
          600: '#142d38',
          700: '#172a32',
          800: '#0f1c21',
        },
        // Dark Orange/Red
        secondary: {
          100: '#e88e4f',
          200: '#e2702d',
          300: '#d45822',
          400: '#b0431e',
          500: '#8e3720',
          600: '#712f1d',
          700: '#552113',
          800: '#3d150d',
        },
        // Purple
        tertiaryA: {
          400: '#746278',
          500: '#513b56',
          600: '#412f45',
        },
        // Green/Grey
        tertiaryB: {
          100: '#cdd0c6',
          200: '#afb2a4',
          300: '#929685',
          400: '#757a68',
          500: '#54584a',
          600: '#474b40',
          700: '#3c3e36',
          800: '#353730',
        },
        // Yellow/Orange Accent - e.g. Stats WIdget
        tertiaryC: {
          100: '#fdf9e9',
          200: '#fbf1c6',
          300: '#f9e08f',
          400: '#f5c84f',
          500: '#efad1a',
          600: '#e09812',
          700: '#c1730d',
          800: '#9a520e',
          900: '#7f4114',
        },
        // Grey/Blue background - eg. landing banner
        tertiaryD: {
          500: '#2d5b72',
        },
        word: {
          100: '#d4ebe9',
          200: '#aad8d2',
          300: '#7fc4bc',
          400: '#55b1a5',
          500: '#2a9d8f',
          600: '#227e72',
          700: '#195e56',
          800: '#113f39',
        },
        phrase: {
          500: '#c37829',
        },
        song: {
          100: '#e6ccd9',
          200: '#cd99b3',
          300: '#b5668e',
          400: '#9c3368',
          500: '#830042',
          600: '#690035',
          700: '#4f0028',
          800: '#34001a',
        },
        story: {
          100: '#fbf3e1',
          200: '#f6e7c3',
          300: '#f2dca6',
          400: '#edd088',
          500: '#e9C46a',
          600: '#ba9d55',
          700: '#8c7640',
          800: '#5d4e2a',
        },
        charcoal: {
          400: '#5a5a5c',
          500: '#313133',
          600: '#272729',
        },
        gray: colors.stone,
        // Some shades generated based on our custom colours using https://uicolors.app/create by Erik de Vries
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
