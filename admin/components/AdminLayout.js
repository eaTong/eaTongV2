/**
 * Created by eatong on 18-2-11.
 */
import React, {Component} from 'react';
import {Layout, Menu, Icon, Tooltip, Tabs} from 'antd'
import ajax from '~/utils/ajax';
import {inject, observer} from "mobx-react";
import componentsMapping from '~/componentsMapping';
import {REFRESH_TAG} from "~/utils/enums";

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const TabPane = Tabs.TabPane;
const {Content, Sider, Header} = Layout;

@inject('app') @observer
class AdminLayout extends Component {


  async componentWillMount() {
    this.props.app.initialLoginUser();
    await this.props.app.getAuthorisedMenu();
  }

  async logout() {
    await ajax({url: '/api/user/logout'});
    this.props.history.push('/');
  }

  childrenMenus(menus) {
    return menus.map(menu => {
      if (menu.type === 0) {
        return (
          <SubMenu key={menu.path} title={<span><Icon type={menu.icon}/><span>{menu.name}</span></span>}>
            {this.childrenMenus(menu.children)}
          </SubMenu>
        )
      } else if (menu.type === 1) {
        return (
          <MenuItem key={menu.path} onClick={() => this.props.app.addTab(menu.path, menu.name)}>
            <span><Icon type={menu.icon}/><span>{menu.name}</span></span>
          </MenuItem>
        )
      }
    })
  }

  renderTabs() {
    return this.props.app.tabList.map((tab, index) => {
      const {app} = this.props;
      let tabName = index === 0 ?
        (<span>
          <span className="label">{tab.name}</span>
          <Icon type="sync" onClick={() => app.refreshTab(tab, index)}/>
        </span>) :
        (<span>
          <span className="label">{tab.name}</span>
          <Icon type="sync" onClick={() => app.refreshTab(tab, index)}/>
          <Icon type="close" onClick={(event) => app.closeTab(tab.path, event)}/>
        </span>);

      let realUrl = tab.path.split('?')[0].split(REFRESH_TAG)[0];
      const Comp = componentsMapping[realUrl];
      return (<TabPane tab={tabName} key={tab.path}>
        <Comp {...(tab.optionalData || {})} path={realUrl}/>
      </TabPane>);
    })

  }

  render() {
    const {app} = this.props;
    const {loginUser, menus, tabList, activeKey} = app;
    return (
      <Layout>
        <Header className="header">
          <div className="brand">eaTong V2</div>
          <span className="welcome">欢迎您：</span>
          <span className="name">{loginUser.name}</span>
          <Tooltip title='退出'>
            <Icon type="poweroff" onClick={() => this.logout()}/>
          </Tooltip>
        </Header>
        <Layout className="layout">
          <Sider>
            <Menu mode="inline" theme="dark">
              {this.childrenMenus(menus)}
            </Menu>

          </Sider>
          <Content>
            <Tabs onChange={(path) => app.onChangeTab(path)} type="card" activeKey={activeKey} animated>
              {this.renderTabs()}
            </Tabs>
          </Content>
        </Layout>
      </Layout>

    )
  }
}

function callback(key) {
  console.log(key);
}

AdminLayout.propsType = {};

export default AdminLayout;
