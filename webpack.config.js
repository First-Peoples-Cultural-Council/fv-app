const path = require('path')

const webpack = require('webpack')
const dotenv = require('dotenv')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { InjectManifest } = require('workbox-webpack-plugin')

dotenv.config()

const isDev = process.env.NODE_ENV !== 'production'
const serviceWorkersEnabled = !isDev || process.env.SERVICE_WORKERS === 'true'

const srcPath = path.join(__dirname, 'src')
const buildPath = path.join(__dirname, 'build')
const publicPath = path.join(__dirname, 'public')

const appSrc = path.resolve(srcPath, 'index.tsx')
const swSrc = path.resolve(srcPath, 'service-worker.ts')

module.exports = {
  mode: isDev ? 'development' : 'production',
  target: ['browserslist'],
  stats: 'errors-warnings',
  bail: !isDev,
  devtool: isDev ? 'cheap-module-source-map' : false,
  watchOptions: {
    poll: 1000,
    aggregateTimeout: 1000,
    ignored: ['**/node_modules', path.resolve(srcPath, 'serviceWorkerRegistration.ts')],
  },

  entry: appSrc,
  output: {
    path: buildPath,
    pathinfo: isDev,
    filename: isDev ? 'assets/js/bundle.js' : 'assets/js/[name].[contenthash:8].js',
    chunkFilename: isDev ? 'assets/js/[name].chunk.js' : 'assets/js/[name].[contenthash:8].chunk.js',
    publicPath: '/',
  },
  optimization: {
    minimize: !isDev,
  },
  infrastructureLogging: {
    level: 'none', // can be changed to verbose or other levels as required
  },
  // Default cache is memory-based in dev mode, and disabled in prod mode
  // but can be configured further if required

  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss', '.sass', '.css'],
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
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
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
                ident: 'postcss',
                config: false,
                plugins: [require('tailwindcss')],
              },
            },
          },
        ],
      },
      {
        // maxSize to these media assets can be enforced on webpack level
        test: /\.(ico|png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: require.resolve('@svgr/webpack'),
            options: {
              prettier: false,
              svgo: false,
              svgoConfig: {
                plugins: [{ removeViewBox: false }],
              },
              titleProp: true,
              ref: true,
            },
          },
          {
            loader: require.resolve('file-loader'),
          },
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
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
            ignore: ['**/index.html', '**/robots.txt', '**/*.{png, jpg, jpeg, ico, gif}', '**/manifest.*.json'],
          },
        },
        {
          // Images are copied to root instead of assets for FW-6222.
          from: 'public',
          to: '.',
          globOptions: {
            glob: '**/*.{png, jpg, jpeg, ico, gif}',
            ignore: ['**/index.html', '**/robots.txt'],
          }
        },
        {
          from: 'public/robots.txt',
          to: '.',
        },
      ],
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      ...(!isDev && {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
    }),
    isDev &&
      new ReactRefreshWebpackPlugin({
        overlay: false,
      }),
    isDev && new CaseSensitivePathsPlugin(),
    !isDev &&
      new MiniCssExtractPlugin({
        filename: `assets/css/[name].[contenthash:8].css`,
        chunkFilename: 'assets/css/[name].[contenthash:8].chunk.css',
      }),
    serviceWorkersEnabled &&
      new WebpackManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: publicPath,
      }),
    serviceWorkersEnabled &&
      new InjectManifest({
        swSrc,
        swDest: 'service-worker.js',
        dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
        exclude: [/\.map$/, /manifest$/, /\.htaccess$/, /asset-manifest\.json$/, /LICENSE/],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      }),
    // can also add ESLint plugin here
  ].filter(Boolean),

  devServer: {
    historyApiFallback: {
      disableDotRule: true,
      index: '/index.html'
    },
    compress: true,
    server: 'http',
    port: 3000,
    headers: {},
    static: {
      publicPath,
    },

    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
}
