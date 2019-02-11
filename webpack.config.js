var path = require("path");

module.exports = {
  //mode: "development",
  // mode: "production",
  //   optimization: {
  //     minimize: false
  //   },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: require.resolve("babel-loader"),
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: "last 2 version, > 1%, ie >= 10"
                }
              ]
            ],
            plugins: [
              [
                "@babel/plugin-transform-runtime",
                {
                  corejs: false,
                  helpers: true,
                  regenerator: true,
                  useESModules: false
                }
              ]
            ]
          }
        }
      }
    ]
  },
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    library: "dvaCore",
    libraryTarget: "umd"
  },
  externals: {
    redux: "Redux",
    "redux-saga": "ReduxSaga"
  }
};
