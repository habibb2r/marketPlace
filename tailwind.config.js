/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: ["acid", "synthwave", "forest"],
  },
  plugins: [
    require('daisyui'),
  ],
}

