module.exports = {
  purge: [
    "./src/renderer/**/*.ts",
    "./src/renderer/**/*.tsx"
  ],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        surface: {
          dark: "#121212",
          light: "#ffffff",
          light005: "rgba(255, 255, 255, 0.05)"
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
