const path = require('path');

const config = {
  entry: './src/index.js',
  output: {
    publicPath: '/dist/',
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  devServer: {
    open: true,
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    disableHostCheck: true,
    contentBase: 'public',
  },

  devtool: 'inline-source-map',

  // devServer: {
  //   inline: true,
  //   host: '172.29.192.1',
  //   port: 3000,
  //   historyApiFallback: true,
  //   disableHostCheck: true,
  //   contentBase: 'public',
  // },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
        },
      },
      // {
      //   test: /\.(js|jsx)$/i,
      //   loader: 'babel-loader',
      // },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },

  mode: 'development',
};

module.exports = config;
