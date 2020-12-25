module.exports = {
  target: ['ie11', {
    objectFit: 'default',
    objectPosition: 'default',
    position: 'default',
  }],
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [
    "src/ejs/**/*.ejs"
  ],
  theme: {
    extend: {
      colors: {
        footer: '#f4f4f1',
        gray1: '#a0a0a0',
        gray2: '#f7f6f5',
        gray3: '#e1e1d7',
        mainBlack: "#1e1e1e",
        main: "#1f4495",
        subBlue: "#6595ed",
        accBlue: "#def1f7",
        accent: "#ed8e01",
      },
      fontSize: {
        tiny:"0.9375rem",
      }
    },
  },
  variants: {},
  plugins: [],
}
