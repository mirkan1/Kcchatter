/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
	  "./index.html",
	  "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
	oblue: '#467599',
	midblue: '#CDE6F5',
	lightblue: '#E9F6FE',
  dark: '#022042',
  crossmaskblue: '#0060a9',
  mirogreen: '#287233',
  berogreen: '#4f7942'
  /* --background-color: var(--dark-gray);
  --border-color: var(--light-gray); */
    	}
    },
  },
  plugins: [],
}
