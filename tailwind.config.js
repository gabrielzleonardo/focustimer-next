/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "bg-forest",
    "bg-rain",
    "bg-coffee",
    "bg-fireplace",
    "bg-forestActive",
    "bg-rainActive",
    "bg-coffeeActive",
    "bg-fireplaceActive",
  ],
  theme: {
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
    },
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
      backgroundImage: {
        forest: "url('/images/card-icons/forest.svg')",
        rain: "url('/images/card-icons/rain.svg')",
        fireplace: "url('/images/card-icons/fire.svg')",
        coffee: "url('/images/card-icons/coffee.svg')",
        forestActive: "url('/images/card-icons/forest-active.svg')",
        rainActive: "url('/images/card-icons/rain-active.svg')",
        fireplaceActive: "url('/images/card-icons/fire-active.svg')",
        coffeeActive: "url('/images/card-icons/coffee-active.svg')",
      },
    },
  },
  plugins: [],
};
