/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/client/src/**/*.{html,js,ts,jsx,tsx}',
    './libs/common-components/src/**/*.{html,jsx,js,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'color-primary-0': '#b40000',
        'color-primary-1': '#EF3F3F',
        'color-primary-2': '#DC0E0E',
        'color-primary-3': '#910000',
        'color-primary-4': '#660000',
      },
    },
  },
  plugins: [],
};
