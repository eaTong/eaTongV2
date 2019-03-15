/**
 * Created by eatong on 19-2-14.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, Form, Input, message} from 'antd';
import {GLOBAL_LAYOUT} from '~/utils/constants';

const FormItem = Form.Item;

class ChangePassword extends Component {

  onSaveData() {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      this.props.onOk && this.props.onOk(values);
    });
  }

  render() {
    const {operateType} = this.props;
    const {getFieldDecorator} = this.props.form;
    return (
      <Modal
        title={'修改密码'}
        maskClosable={false}
        visible={true}
        onOk={this.onSaveData.bind(this)}
        onCancel={this.props.onCancel}
      >
        <Form>
          <FormItem {...GLOBAL_LAYOUT} label="原始密码" hasFeedback>
            {getFieldDecorator('originPassword', {
              rules: [{
                required: true, message: '请填写原始密码!',
              }],
            })(<Input type={'password'}/>)}
          </FormItem>
          <FormItem {...GLOBAL_LAYOUT} label="新密码" hasFeedback>
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: '请填写原始密码!',
              }],
            })(<Input type={'password'}/>)}
          </FormItem>
          <FormItem {...GLOBAL_LAYOUT} label="确认密码" hasFeedback>
            {getFieldDecorator('confirmPassword', {
              rules: [{
                required: true, message: '请填写原始密码!',
              }],
            })(<Input type={'password'}/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

ChangePassword.propTypes = {
  operateType: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  formData: PropTypes.object
};
ChangePassword = Form.create()(ChangePassword);
export default ChangePassword;
