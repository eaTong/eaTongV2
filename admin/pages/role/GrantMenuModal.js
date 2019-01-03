/**
 * Created by eatong on 18-2-21.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, message, Checkbox, Tree} from 'antd';
import ajax from "~/utils/ajax";
import unique from 'array-unique'

const TreeNode = Tree.TreeNode;


class GrantMenuModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      grantedMenus: [],

    };
  }

  parentKeys = ['0'];
  pathMapping = {};
  keyMapping = {};
  parentKeyMapping = {};

  async componentWillMount() {
    this.state.grantedMenus = (this.props.formData.menus || []).map(id => id + '');
    const data = await ajax({url: '/api/menu/get'});
    this.initialParentMapping(data);
    this.setState({menus: data});
  }

  initialParentMapping(data) {
    for (let menu of data) {
      this.keyMapping[menu.id + ''] = menu.path;
      this.pathMapping[menu.path] = menu.id + '';
      this.parentKeyMapping[menu.path] = menu.parentPath;
      if (menu.children && menu.children.length > 0) {
        this.initialParentMapping(menu.children);
        this.parentKeys.push(menu.id + '');
      }
    }
  }

  onCheckMenu(checkedKeys) {
    let grantedMenus = [];
    for (const key of checkedKeys) {
      grantedMenus.push(key);
      grantedMenus = grantedMenus.concat(this.getParentKeys(key));
    }
    this.setState({grantedMenus: unique(grantedMenus)});
  }

  getParentKeys(key) {
    let parentId;
    if (/\d+/.test(key) && key !== '0') {
      parentId = this.pathMapping[this.parentKeyMapping[this.keyMapping[key]]] || '0';
      return [parentId].concat(this.getParentKeys(parentId));
    } else {
      return '0';
    }
  }

  onSaveData() {
    const {onOk, formData} = this.props;
    onOk && onOk({menus: this.state.grantedMenus.map(id => ~~id).filter(id => !!id), roleId: formData.id});
  }

  renderTreeNodes(data) {
    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.name} key={item.id + ''} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.name} key={item.id + ''} dataRef={item} {...item} />;
    })
  }

  render() {
    const {menus, grantedMenus} = this.state;
    return (
      <Modal
        title={'分配菜单'}
        maskClosable={false}
        visible={true}
        onOk={this.onSaveData.bind(this)}
        onCancel={this.props.onCancel}
      >
        {menus.length > 0 && (
          <Tree
            checkable
            autoExpandParent
            checkedKeys={grantedMenus.filter(id => this.parentKeys.indexOf(id) === -1)}
            onCheck={(...args) => this.onCheckMenu(...args)}
          >
            {this.renderTreeNodes(menus)}
          </Tree>
        )}
      </Modal>
    );
  }
}

GrantMenuModal.propTypes = {
  operateType: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  formData: PropTypes.object
};
export default GrantMenuModal;
