/**
 * Created by eaTong on 2018/11/22 .
 * Description:
 */
import React, {Component, Fragment} from 'react';
import {Router, Route} from 'react-router';
import {HashRouter  , BrowserRouter} from 'react-router-dom';
import './styles/app.less';
import {LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import PropTypes from 'prop-types';
import AdminLayout from './components/AdminLayout';
import {Provider} from 'mobx-react';
import '~/utils/prototype';
import stores from '~/stores';

import HomePage from '~/views/HomePage';
import LoginPage from '~/views/login/LoginPage';
//UPDATE_TAG:importPage

const routes = [
//UPDATE_TAG:addPageRoute
];


export default class App extends Component {
  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <Provider {...stores}>
          <BrowserRouter>
            <Fragment>
              <Route path="/" component={HomePage} exact/>
              <Route path="/login" component={LoginPage}/>
            </Fragment>
          </BrowserRouter>
        </Provider>
      </LocaleProvider>
    )
  }
}
