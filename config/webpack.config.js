const path = require('path');
const webpack = require('webpack');
const autoPrefixer = require('autoprefixer');

module.exports = {
  devtool: 'cheap-module-source-map',
  mode:'development',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', {
          loader: 'postcss-loader', options: {
            plugins: [autoPrefixer]
          }
        }]
      }, {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'postcss-loader', options: {
              plugins: [autoPrefixer]
            }
          }, {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.jsx?$/,
        use: ['babel-loader']
      }, {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000,
            name: '[name]_[hash:8].[ext]'
          }
        }

      }, {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000,
            mimetype: 'application/font-woff',
            name: '[name]_[hash:8].[ext]'
          }
        }
      }
    ]
  }
};
