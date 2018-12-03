/**
 * Created by eatong on 17-3-13.
 */

const path = require('path');
const webpack = require('webpack');
const ROOT_PATH = path.resolve(__dirname,'../');
const APP_PATH = path.resolve(ROOT_PATH, 'admin');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoPrefixer = require('autoprefixer');

module.exports = {
  mode: 'production',
  entry: {
    app: path.resolve(APP_PATH, 'index.js'),
  },
  output: {
    path: path.resolve(ROOT_PATH, 'adminDist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '~':path.resolve(__dirname, '..' ,'admin'),
    }
  },
  plugins: [
    //这个使用uglifyJs压缩你的js代码
    // new webpack.optimize.UglifyJsPlugin({minimize: true}),
    //把入口文件里面的数组打包成verdors.js
    new HtmlwebpackPlugin({
      template: path.resolve(ROOT_PATH, 'index-production.html'),
      filename: 'admin.html',
      //要把script插入到标签里
      inject: false,
    }),
    new ExtractTextPlugin("style.css")
  ],
  module: {
    rules: [{
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
          loader: 'less-loader',
          options: {
            javascriptEnabled: true
          }
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
