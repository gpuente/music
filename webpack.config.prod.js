const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const client = {
  entry: {
    js: './src/app-client.js',
  },
  output: {
    path: path.join(__dirname, 'dist', 'static', 'js'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: path.join(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: 'cacheDirectory=.babel_cache',
        },
      },
    ],
  },
};

const server = {
  target: 'node',
  node: {
    __dirname: false,
  },
  externals: [nodeExternals({
    modulesFromFile: true,
  })],
  entry: {
    js: './src/server.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server-es5.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: path.join(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: 'cacheDirectory=.babel_cache',
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/static', to: 'static/' },
      { from: 'src/views', to: 'views/' },
    ],{
      ignore: [
        { glob: '.gitkeep' },
      ],
    }),
  ],
};

module.exports = [client, server];
