const path = require('path');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');

const isProduction = process.env.NODE_ENV === 'production';

const root = path.resolve(__dirname);
const buildPath = path.resolve(root, 'build');

const config = {
  entry: {
    main: '/src/index.tsx',
  },
  output: {
    path: buildPath,
    publicPath: buildPath,
    clean: true,
    filename: '[name].js',
    cssFilename: '[name].[contenthash].css',
    chunkFilename: 'main.[contenthash]-chunk.js',
    assetModuleFilename: '[path][name].[hash][ext][query]',
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          to: 'build',
          globOptions: {
            ignore: [
              // Ignore all `html` files
              '**/*.html',
            ],
          },
        },
      ],
    }),
    new WebpackAssetsManifest({
      entrypoints: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|json)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
    config.plugins.push(
      new WorkboxWebpackPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: false,
        swDest: 'service-worker.js',
        sourcemap: true,
      })
    );
  } else {
    config.mode = 'development';
    config.devtool = 'inline-source-map';
    config.devServer = {
      static: {
        directory: buildPath,
      },
      server: 'https',
      open: true,
      host: '0.0.0.0',
      port: 3000,
    };
    config.performance = {
      hints: 'warning',
    };
  }
  return config;
};
