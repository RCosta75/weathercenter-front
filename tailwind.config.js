/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textStrokeWidth: {
        DEFAULT: '1px',
        md: '2px',
        lg: '10px',
      },
      textStrokeColor: {
        white: '#ffffff',
        black: '#000000',
        red: '#ff0000',
      },
    },
  },
  plugins: [require('tailwindcss-text-stroke')],
}