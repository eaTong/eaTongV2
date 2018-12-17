import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
// import {Page, Title, Footer} from '~components';
import {notify, Page} from '../../website/components';
import Head from 'next/head';
import {inject, observer} from 'mobx-react'
import ajax from '../../website/util/ajax';

@inject('yzz') @observer
class Blog extends Component {

  static async init(ctx) {

  }

  render() {
    const {yzz} = this.props;
    return (
      <div className={'container'}>
        <div className="section">
          <div className="title">云智装试用管理</div>
          <div className="field">
            <label className="label">帐号</label>
            <div className="control">
              <input className="input" type="text" placeholder="帐号"/>
            </div>
          </div>
          <div className="field">
            <label className="label">密码</label>
            <div className="control">
              <input className="input" placeholder="密码" type='password'/>
            </div>
          </div>

          <button className='button is-fullwidth' onClick={() => yzz.login()}>登录</button>
        </div>
      </div>
    );
  }
}

Blog.propTypes = {};
export default Page(Blog);
