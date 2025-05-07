module.exports = {
  theme: {
    extend: {
      animation: {
        stripe: "stripe 1s linear infinite",
      },
      keyframes: {
        stripe: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "40px 0" },
        },
      },
    },
  },
  plugins: [],
};
