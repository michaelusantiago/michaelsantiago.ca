module.exports = {
  plugins: {
    "postcss-import": {},
    "tailwindcss/nesting": {},
    tailwindcss: {},
    autoprefixer: {},
    "postcss-preset-env": {
      stage: 1,
      features: {
        'nesting-rules': false 
      },
    },
  },
}

// module.exports = {
//   plugins: [
//     require('autoprefixer'),
//     require('postcss-preset-env')({
//       stage: 1,
//     })
//   ]
// }