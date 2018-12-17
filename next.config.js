const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');


module.exports = {
  webpack: (config, {dev}) => {
    config.module.rules.push({
      test: /(\.s[ac]ss$)|(\.css$)|(\.less$)/,
      loader: 'emit-file-loader',
      options: {
        name: 'dist/[path][name].[ext]',
      },
    });

    if (!dev) {
      const preLoader = [
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            modules: false,
            url: true,
            sourceMap: false,
            minimize: true,
            localIdentName: '[hash:base64:5]',
          },
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: false,
            plugins: () => [
              autoprefixer(),
            ],
          },
        }];
      config.module.rules.push({
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: preLoader
        })
      }, {
        test: /\.s[ac]ss$/,
        use: ExtractTextPlugin.extract({
          use: [
            ...preLoader,
            {
              loader: 'sass-loader',
              options: {
                sourceMap: false,
                includePaths: [
                  path.resolve(__dirname, 'website'),
                  path.resolve(__dirname, 'pages'),
                ],
              },
            },
          ],
        }),
      }, {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [
            ...preLoader,
            {
              loader: 'less-loader',
              options: {
                sourceMap: true,
                includePaths: [
                  path.resolve(__dirname, 'website'),
                  path.resolve(__dirname, 'pages'),
                ],
              },
            },
          ],
        }),
      });

      config.plugins.push(new ExtractTextPlugin('/static/app.css'));
    } else {
      config.module.rules.push({
        test: /\.css$/,
        use: [
          {loader: 'raw-loader'},
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: 'inline',
              plugins: () => [
                autoprefixer(),
              ],
            }
          }]
      }, {
        test: /\.s[ac]ss$/,
        use: [
          {loader: 'raw-loader'},
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: 'inline',
              plugins: () => [
                autoprefixer(),
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {sourceMap: true},
          },
        ],
      }, {
        test: /\.less$/,
        use: [
          {loader: 'raw-loader'},
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: 'inline',
              plugins: () => [
                autoprefixer(),
              ],
            },
          },
          {
            loader: 'less-loader',
            options: {sourceMap: true},
          },
        ],
      });
    }
    return config
  }
};
