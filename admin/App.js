/**
 * Created by eaTong on 2018/11/22 .
 * Description:
 */
import React, {Component, Fragment} from 'react';
import {Router, Route} from 'react-router';
import {HashRouter, BrowserRouter} from 'react-router-dom';
import {ConfigProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import AdminLayout from './components/AdminLayout';
import {Provider} from 'mobx-react';
import '~/utils/prototype';
import stores from '~/stores';

import './styles/app.less';
import './styles/components.less';

import HomePage from '~/pages/HomePage';
import LoginPage from '~/pages/login/LoginPage';
import ReactableDemo from "~/demo/ReactableDemo";

export default class App extends Component {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Provider {...stores}>
          <BrowserRouter>
            <Fragment>
              <Route path="/" component={HomePage} exact/>
              <Route path="/login" component={LoginPage}/>
              <Route path="/demo-reactable" component={ReactableDemo}/>
              <Route path="/admin" component={AdminLayout}/>
            </Fragment>
          </BrowserRouter>
        </Provider>
      </ConfigProvider>
    )
  }
}
