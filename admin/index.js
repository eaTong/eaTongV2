/**
 * Created by eaTong on 2018/11/22 .
 * Description:
 */
import '@babel/polyfill';
import {AppContainer} from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const rootEl = document.getElementById('root');
ReactDOM.render(
  <AppContainer>
    <App/>
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./App', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./App').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp/>
      </AppContainer>,
      rootEl
    );
  });
}

window.onerror = function (a, b, c) {
  console.log(a, b, c);
};
