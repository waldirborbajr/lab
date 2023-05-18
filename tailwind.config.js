/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bpp-header': '#343541',
        'bpp-sidebar': '#40414f'
      }
    }
  },
  // plugins: [require("@tailwindcss/forms")],
  plugins: []
}
