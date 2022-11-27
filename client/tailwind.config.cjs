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
	red: '#EF4040',
  dark: '#022042',
  /* --background-color: var(--dark-gray);
  --border-color: var(--light-gray); */
    	}
    },
  },
  plugins: [],
}
