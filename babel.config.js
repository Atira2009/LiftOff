module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo', // Ensure this is included for Expo projects
      '@babel/preset-react', // Add this to enable JSX syntax
    ],
    plugins: [
      'nativewind/babel',
      'babel-plugin-styled-components',
      'react-native-reanimated/plugin', // Keep Reanimated at the end
    ],
  };
};