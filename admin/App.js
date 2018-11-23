/**
 * Created by eaTong on 2018/11/22 .
 * Description:
 */
import React, {Component} from 'react';
import {Router, Route} from 'react-router';
import {HashRouter} from 'react-router-dom';
// import './styles/app.less'

import HomePage from './views/HomePage';

export default class App extends Component {
  render() {
    return (
      <HashRouter>
        <Route path="/" component={HomePage}/>
      </HashRouter>
    )
  }
}
