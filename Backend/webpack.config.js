const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const StartServerPlugin = require("start-server-webpack-plugin");
const packageJson = require("./package.json");

const { NODE_ENV: nodeEnv } = process.env;
const DEVELOPMENT = nodeEnv === "development";

module.exports = {
  mode: nodeEnv,
  entry: {
    index: [
      DEVELOPMENT && "webpack/hot/poll?1000",
      "regenerator-runtime/runtime",
      path.resolve(__dirname, packageJson.source),
    ].filter(Boolean),
  },
  externals: [
    nodeExternals({
      whitelist: ["webpack/hot/poll?1000"],
    }),
  ],
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // include: path.resolve(__dirname, 'source'),
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  target: "node",
  node: {
    __dirname: true,
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: JSON.stringify(nodeEnv),
    }),

    DEVELOPMENT &&
      new StartServerPlugin({
        name: "index.js",
      }),

    new webpack.NamedModulesPlugin(),
    DEVELOPMENT && new webpack.HotModuleReplacementPlugin(),

    new webpack.NoEmitOnErrorsPlugin(),
  ].filter(Boolean),
  resolve: {
    extensions: [".js"],
  },
  devtool: "source-map",
};
