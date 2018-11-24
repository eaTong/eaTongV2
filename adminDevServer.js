/**
 * Created by eaTong on 2018/11/22 .
 * Description:
 */
const path = require('path');
const proxy = require('proxy-middleware');
const webpack = require('webpack');
const express = require('express');
const url = require('url');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./config/webpack.config');
const projectConfig = require('./config/project.config');
// const

const app = express();
const compiler = webpack(webpackConfig);
const SERVER_PATH = `http://127.0.0.1:${projectConfig.devServerPort}`; //beta

app.use('/api', proxy(url.parse(SERVER_PATH + '/api')));
app.use('/upload', proxy(url.parse(SERVER_PATH + '/upload')));

app.use(devMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  historyApiFallback: true,
}));

app.use(hotMiddleware(compiler));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(projectConfig.frontEndServerPort, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log(`Listening at http://localhost:${projectConfig.frontEndServerPort}/`);
});
