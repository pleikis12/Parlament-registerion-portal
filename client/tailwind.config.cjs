module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  theme: {
    container: {
      center: true,
    },
    extend: {
      boxShadow: {
        custom: "rgba(0, 0, 0, 0.15) 0px 5px 15px",
        custom1: "0 0 3px 8px #3b82f620",
        custom2:
          "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
        custom3: "0 3px 12px rgba(8, 112, 184, 0.7);",
      },
    },
  },
};
