/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#ef4444', // red-500
      }
    },
  },
  plugins: [],
  // Add if you want to remove default styles
  corePlugins: {
    preflight: false,
  }
}