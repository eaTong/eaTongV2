/**
 * Created by eaTong on 2018/11/22 .
 * Description:
 */
import React, {Component, Fragment} from 'react';
import {Router, Route} from 'react-router';
import {HashRouter, BrowserRouter} from 'react-router-dom';
import './styles/app.less';
import {LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import PropTypes from 'prop-types';
import AdminLayout from './components/AdminLayout';
import {Provider} from 'mobx-react';
import '~/utils/prototype';
import stores from '~/stores';

import HomePage from '~/pages/HomePage';
import LoginPage from '~/pages/login/LoginPage';
import TaskPage from '~/pages/task/TaskPage';
import UserPage from "~/pages/user/UserPage";
import RolePage from "~/pages/role/RolePage";
//UPDATE_TAG:importPage

const routes = [
  {key: "/admin/user", component: UserPage},
  {key: "/admin/role", component: RolePage},
  {key: '/admin/task', component: TaskPage},
//UPDATE_TAG:addPageRoute
];


function renderRoute() {
  return routes.map(item => <Route exact path={item.key} key={item.key} component={item.component}/>)
}
export default class App extends Component {
  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <Provider {...stores}>
          <BrowserRouter>
            <Fragment>
              <Route path="/" component={HomePage} exact/>
              <Route path="/login" component={LoginPage}/>
              <Route path="/admin" component={(props) => (
                <AdminLayout {...props}>
                  {renderRoute()}
                </AdminLayout>
              )}/>
            </Fragment>
          </BrowserRouter>
        </Provider>
      </LocaleProvider>
    )
  }
}
