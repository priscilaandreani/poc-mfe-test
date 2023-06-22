const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  entry: './src/index',
  mode: 'development',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:9000/'
  },
  devServer:{ 
    port: 9000,
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, "static"),
    }
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: [require.resolve('@babel/preset-react')]
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
      title: 'Consumer'
    }),
    new ModuleFederationPlugin({
      name: 'consumer',
      filename: 'remoteEntry.js',
      remotes: {
        federated: 'Federated@http://localhost:9001/remoteEntry.js'
      },
      exposes: {
        './Consumer': './src/App'
      }
    })
  ]
}