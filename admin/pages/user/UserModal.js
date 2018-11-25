/**
 * Created by eatong on 18-2-11.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, Form, Input, message} from 'antd';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 6},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 14},
  },
};

class UserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.props.operateType === 'edit') {
      this.props.form.setFieldsValue(this.props.formData);
    }
  }

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
      <Modal title={(operateType === 'add' ? '新增' : '编辑') + '账号'}
             maskClosable={false}
             visible={true} onOk={this.onSaveData.bind(this)} onCancel={this.props.onCancel}>
        <Form>
          <FormItem
            {...formItemLayout}
            label="姓名"
            hasFeedback>
            {getFieldDecorator('name', {
              rules: [{
                required: true, message: '请填写姓名!',
              }],
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="账号"
            hasFeedback>
            {getFieldDecorator('account', {
              rules: [{
                required: true, message: '请填写账号!',
              }],
            })(
              <Input/>
            )}
          </FormItem>
          {operateType === 'add' && (
            <FormItem
              {...formItemLayout}
              label="密码"
              hasFeedback>
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: '请填写密码!',
                }],
              })(
                <Input/>
              )}
            </FormItem>
          )}
        </Form>
      </Modal>
    );
  }
}

UserModal.propTypes = {
  operateType: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  formData: PropTypes.object
};
UserModal = Form.create()(UserModal);
export default UserModal;
