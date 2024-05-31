// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const webpack = require('webpack');
const dotenv = require('dotenv').config( {
  path: path.join(__dirname, '.env')
} );
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const WebpackAssetsManifest = require("webpack-assets-manifest");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = MiniCssExtractPlugin.loader;

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW({
  clientsClaim: true,
  skipWaiting: false,
  swDest: 'service-worker.js',
  sourcemap: true,}));
  } else {
    config.mode = "development";
    config.devtool = "source-map";
    config.devServer = {
    static: {
      directory: path.resolve(__dirname, "build"),
    },
    open: true,
    host: "localhost",
    port: 3000
    };
  }
  return config;
};

const config = {
  entry: {
    main: ['./src/index.tsx', './src/index.css'],
    serviceWorker: ['./src/service-worker.ts'],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    clean: true,
    filename: "[name].js",
    cssFilename: "[name].[contenthash].css",
    chunkFilename: "main.[contenthash]-chunk.js",
    assetModuleFilename: '[path][name].[hash][ext][query]'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),

    new MiniCssExtractPlugin(),

    new webpack.DefinePlugin( {
      "process.env": dotenv.parsed
    } ),

    new CopyPlugin({
    patterns: [
      {
        from: "./public/",
        globOptions: {
          ignore: [
            // Ignore all `html` files
            "**/*.html",
          ]}}],
    }),
     new WebpackAssetsManifest({
      entrypoints:true
    }),
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.css$/i,
        use: ['style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          }],
        include: /\.module\.css$/,
      },
    {
      test: /\.css$/,
      use: [stylesHandler, "css-loader"],
      exclude: /\.module\.css$/,
    },
    {
      test: /\.svg$/,
      use: "file-loader",
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
      type: "asset/resource",
      generator: {
        filename: 'static/media/[name].[hash][ext][query]'
      }
    },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
  },
};
