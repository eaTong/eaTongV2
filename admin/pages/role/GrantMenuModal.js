/**
 * Created by eatong on 18-2-21.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, message, Checkbox} from 'antd';
import ajax from "~/utils/ajax";

const CheckboxGroup = Checkbox.Group;

class GrantMenuModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      grantedMenus: [],
    };
  }

  async componentWillMount() {
    this.state.grantedMenus = [...this.props.formData.menus || []];
    const data = await ajax({url: '/api/menu/get'});
    this.setState({menus: data})
  }

  onChangeGrant(grantedMenus) {
    this.setState({grantedMenus});
  }

  onSaveData() {
    const {onOk, formData} = this.props;
    onOk && onOk({menus: this.state.grantedMenus, roleId: formData.id});
  }

  render() {
    const {menus, grantedMenus} = this.state;
    const options = menus.map(menu => {
      return {label: menu.name, value: menu.id}
    });
    return (
      <Modal title={'分配菜单'}
             maskClosable={false}
             visible={true} onOk={this.onSaveData.bind(this)} onCancel={this.props.onCancel}>
        <CheckboxGroup options={options} onChange={this.onChangeGrant.bind(this)} value={grantedMenus}/>
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
