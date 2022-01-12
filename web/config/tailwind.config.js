const colors = require('tailwindcss/colors')
module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: colors.emerald,
        secondary: colors.sky,
      },
    },
  },
  plugins: [],
}
