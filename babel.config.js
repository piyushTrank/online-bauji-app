module.exports = {
  presets: ['module:metro-react-native-babel-preset', '@babel/preset-typescript'],
  plugins: [
    "react-native-reanimated/plugin",
  ],
  overrides: [
    {
      test: /\.tsx$/,
      exclude: /\.tsx$/,
    },
  ],
};
