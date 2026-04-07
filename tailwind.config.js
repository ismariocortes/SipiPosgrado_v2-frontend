export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        uady: {
          primary: "#003366",
          secondary: "#0055A5",
          accent: "#F2A900",
          bg: "#F5F7FA",
        },
      },
      fontFamily: {
        sans: ['"Source Sans 3"', "system-ui", "sans-serif"],
        display: [
          '"Plus Jakarta Sans"',
          '"Source Sans 3"',
          "system-ui",
          "sans-serif",
        ],
        serif: ['"Source Serif 4"', "Georgia", "serif"],
      },
      backgroundImage: {
        "grid-light":
          "linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)",
      },
      backgroundSize: {
        grid: "56px 56px",
      },
      boxShadow: {
        card:
          "0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)",
      },
    },
  },
  plugins: [],
}