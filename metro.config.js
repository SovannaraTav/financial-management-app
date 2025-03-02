// Importing default configuration from Expo Metro config package
const { getDefaultConfig } = require('@expo/metro-config');

// Fetching the default Metro configuration for the project
const defaultConfig = getDefaultConfig(__dirname);

/*
Adding 'cjs' file extension to the resolver's source extensions to support the 
Google Firebase SDK and ensure it is bundled correctly
*/
defaultConfig.resolver.sourceExts.push('cjs');

// Exporting the modified configuration
module.exports = defaultConfig;