/**
 * Created by eatong on 18-2-11.
 */
import React, {Component} from 'react';
import {Layout, Menu, Icon, Tooltip} from 'antd'
import ajax from '~/utils/ajax';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const {Content, Sider} = Layout;

class AdminLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      loginUser: {}
    };
  }

  async componentWillMount() {
    this.state.loginUser = JSON.parse(window.sessionStorage.getItem('loginUser') || '{}');
    const menus = await ajax({url: '/api/menu/authorised'});
    this.setState({menus});
  }

  onSelectMenu({key}) {
    window.localStorage.setItem('lastUrl', key);
    this.props.history.push(key);
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
      }else if(menu.type === 1){
        return (
          <MenuItem key={menu.path}><span><Icon type={menu.icon}/><span>{menu.name}</span></span></MenuItem>
        )
      }
    })
  }

  render() {
    const {loginUser, menus} = this.state;
    return (
      <Layout className="layout">
        <Sider breakpoint="lg">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={[window.location.pathname]}
            onClick={this.onSelectMenu.bind(this)}
          >
            {this.childrenMenus(menus)}
          </Menu>
          <div className='personal-info'>
            <span className="welcome">欢迎您：</span>
            <span className="name">{loginUser.name}</span>
            <Tooltip title='退出'>
              <Icon type="poweroff" onClick={() => this.logout()}/>
            </Tooltip>
          </div>
        </Sider>
        <Content>
          {this.props.children}
        </Content>
      </Layout>
    )
  }
}

AdminLayout.propsType = {};

export default AdminLayout;
