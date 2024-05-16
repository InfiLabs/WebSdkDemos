const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: path.resolve(__dirname, "src/App.tsx"),
  output: {
    filename: "js/bundle.[name].[contenthash:5].js",
    assetModuleFilename: "assets/[hash][ext][query]",
  },
  devtool: process.env.MODE === "production" ? false : "inline-source-map",
  mode: process.env.MODE === "development" ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.(less)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]_[hash:base64:5]",
              },
            },
          },
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.svg$/i,
        // use: ['@svgr/webpack'],
        use: ["@svgr/webpack", "url-loader"],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: /\.(png|jpg|jpeg|gif|webp)$/i,
        type: "asset",
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".jsx", ".js", ".ts", ".tsx"],
    modules: ["node_modules"],
    fallback: {
      child_process: false,
      "aws-sdk": false,
      nock: false,
      "mock-aws-s3": false,
      fs: false,
      pinyin: false,
    },
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.[name].[contenthash:5].css",
      chunkFilename: "css/[id].css",
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new NodePolyfillPlugin(),
  ],
};

module.exports = config;
