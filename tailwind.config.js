/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#312e81",
        whiteview: "#d1d5db",
        indi: "#3730a3",
        tabbtn: "#3b82f6",
      },
    },
  },
  plugins: [],
};
