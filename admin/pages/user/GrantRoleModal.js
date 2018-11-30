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
      roles: [],
      grantedRoles: [],
    };
  }

  async componentWillMount() {
    this.state.grantedRoles = [...this.props.formData.roles || []].map(role => role.id);
    const data = await ajax({url: '/api/role/get'});
    this.setState({roles: data})
  }

  onChangeGrant(grantedRoles) {
    this.setState({grantedRoles});
  }

  onSaveData() {
    const {onOk, formData} = this.props;
    onOk && onOk({roles: this.state.grantedRoles, userId: formData.id});
  }

  render() {
    const {roles, grantedRoles} = this.state;
    const options = roles.map(menu => {
      return {label: menu.name, value: menu.id}
    });
    return (
      <Modal title={'分配菜单'}
             maskClosable={false}
             visible={true} onOk={this.onSaveData.bind(this)} onCancel={this.props.onCancel}>
        <CheckboxGroup options={options} onChange={this.onChangeGrant.bind(this)} value={grantedRoles}/>
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
