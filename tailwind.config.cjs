/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#512bd4',
        'brand-lighter': {
          100: '#EEEAFB',
          200: '#DCD5F6',
          300: '#CBBFF2',
          400: '#B9AAEE',
          500: '#A895EA',
          600: '#9780E5',
          700: '#856BE1',
          800: '#7455DD',
          900: '#6240D8'
        },
        'brand-darker': {
          100: '#080415',
          200: '#10092A',
          300: '#180D40',
          400: '#201155',
          500: '#29166A',
          600: '#311A7F',
          700: '#391E94',
          800: '#4122AA',
          900: '#4927BF'
        }
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    darkTheme: 'light',
    themes: false
  }
};
