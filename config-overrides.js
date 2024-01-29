const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('node:path');
module.exports = function override(config, env) {
  return config;
};
