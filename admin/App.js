/**
 * Created by eaTong on 2018/11/22 .
 * Description:
 */
import React, {Component, Fragment} from 'react';
import {Router, Route} from 'react-router';
import {HashRouter, BrowserRouter} from 'react-router-dom';
import {LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import PropTypes from 'prop-types';
import AdminLayout from './components/AdminLayout';
import {Provider} from 'mobx-react';
import '~/utils/prototype';
import stores from '~/stores';

import './styles/app.less';
import './styles/components.less';

import HomePage from '~/pages/HomePage';
import LoginPage from '~/pages/login/LoginPage';

export default class App extends Component {
  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <Provider {...stores}>
          <BrowserRouter>
            <Fragment>
              <Route path="/" component={HomePage} exact/>
              <Route path="/login" component={LoginPage}/>
              <Route path="/admin" component={AdminLayout}/>
            </Fragment>
          </BrowserRouter>
        </Provider>
      </LocaleProvider>
    )
  }
}
