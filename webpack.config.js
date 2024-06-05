const path = require('path');

const webpack = require('webpack');
const dotenv = require('dotenv');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

dotenv.config();

const buildPath = path.join(__dirname, 'build');
const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'source-map' : false,
  watchOptions: {
    poll: 1000,
    aggregateTimeout: 1000,
    ignored: ['**/node_modules'],
  },

  entry: './src/index.tsx',
  output: {
    path: buildPath,
    filename: 'assets/js/[name].min.js',
    sourceMapFilename: '[file].map',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.sass', '.css'],
    modules: ['node_modules'],
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.s?[ac]ss$/i,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { esModule: false, sourceMap: isDev },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: isDev,
              postcssOptions: {
                plugins: [require('tailwindcss')],
              },
            },
          },
        ],
      },
      {
        test: /\.(ico|png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(json)$/i,
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new CopyPlugin({
      patterns: [{ from: 'public', to: 'assets' }],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: {
        collapseWhitespace: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: `assets/css/[name].min.css`,
    }),
  ],

  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        parallel: true,
        minimizerOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
      }),
    ],
  },

  devServer: {
    static: path.join(__dirname, 'public/'),
    port: 3000,
    compress: true,
  },
};
