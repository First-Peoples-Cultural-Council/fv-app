const path = require('path');

const webpack = require('webpack');
const dotenv = require('dotenv');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

dotenv.config();

const swSrc = './src/service-worker.ts'

const buildPath = path.join(__dirname, 'build');
const publicPath = path.join(__dirname, 'public/');

const isDev = process.env.NODE_ENV !== 'production';
const serviceWorkers = process.env.SERVICE_WORKERS;
let startSw = false;

const workboxPlugin = new InjectManifest({
  swSrc,
  swDest: 'serviceWorker.js',
  dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
  exclude: [
    /\.map$/, 
    /manifest$/,
    /\.htaccess$/,
    /service-worker\.js$/,
    /asset-manifest\.json$/, 
    /LICENSE/
  ],
  maximumFileSizeToCacheInBytes: 5 *  1024 * 1024,
})
if (isDev) {
  Object.defineProperty(workboxPlugin, "alreadyCalled", {
    get() {
      return false
    },
    set() {
    },
  })
}

if (isDev && serviceWorkers) {
  startSw = true
} else if (!isDev) {
  startSw = true
}
console.log("startSw", startSw)

module.exports = {
  mode: isDev ? 'development' : 'production',
  // devtool: isDev ? 'eval-source-map' : false,
  devtool: isDev ? 'cheap-module-source-map' : false,
  watchOptions: {
    poll: 1000,
    aggregateTimeout: 1000,
    ignored: ['**/node_modules'],
  },

  entry: './src/index.tsx',
  output: {
    path: buildPath,
    pathinfo: isDev, // Add filenames for reference in dev
    // Add chunking with ref to react-scripts file
    filename: 'assets/js/[name].js',
    sourceMapFilename: 'assets/js/maps/[file].js.map',
  },
  // Checkout webpack caching
  // Checkout webpack optimization
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.sass', '.css'],
    modules: ['node_modules'],
  },

  module: {
    rules: [
      // todo: Add paths to these js/ts loaders
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
      // Checkout react-scripts way of handling svgs
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
      patterns: [
        { 
          from: 'public', 
          to: 'assets',
          globOptions: {
            ignore: ["**/index.html",],
          } 
        }],
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
    // Log a ticket to consider using a genericSw with some configuration
    startSw && workboxPlugin,
  ].filter(Boolean),

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
    static: publicPath,
    port: 3000,
    compress: true,
  },
};
