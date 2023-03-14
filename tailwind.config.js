/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/client/src/**/*.{html,js,ts,jsx,tsx}',
    './libs/common-components/src/**/*.{html,jsx,js,ts,tsx}',
  ],
  theme: {
    extend: {
      transitionProperty: {
        width: 'width',
        height: 'height',
        padding: 'padding',
      },
      fontFamily: {
        regular: ['Regular', 'sans-serif'],
        bold: ['Bold', 'sans-serif'],
        italic: ['Italic', 'sans-serif'],
        boldItalic: ['BoldItalic', 'sans-serif'],
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
        'color-phrases-light': '#C37829',
        'color-phrases-dark': '#C37829',
        'color-songs-light': '#830042',
        'color-songs-dark': '#830042',
        'color-stories-light': '#E9C46A',
        'color-stories-dark': '#E9C46A',
        'color-main-header': '#505050',
      },
    },
  },
  plugins: [],
};
