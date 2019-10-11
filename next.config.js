const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
        use: [
          MiniCssExtractPlugin.loader,
          ...preLoader
        ]
      }, {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          ...preLoader,
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
            },
          },
        ],
      }, {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          ...preLoader,
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      });

      config.plugins.push(new MiniCssExtractPlugin({
        filename: '[name]-[hash].css',
        chunkFilename: '[id].css',
        ignoreOrder: false, // Enable to remove warnings about conflicting order
      }),);
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
