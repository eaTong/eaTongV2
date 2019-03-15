/**
 * Created by eaTong on 2019-03-15 .
 * Description: auto generated in  2019-03-15
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, Form, Input, message} from 'antd';
import {GLOBAL_LAYOUT} from '~/utils/constants';

const FormItem = Form.Item;

class PasswordFormModal extends Component {
  componentDidMount() {
    if (/(edit)|(copyAdd)/.test(this.props.operateType)) {
      const data = this.props.formData;
      this.props.form.setFieldsValue(this.getFormattedValues(this.props.formData, ['expireTime']));


    }
  }

  getFormattedValues(data, timeFields) {
    for (let field of timeFields) {
      if (data[field]) {
        data[field] = moment(data[field])
      } else {
        delete data[field]
      }
    }
    return data;
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
      <Modal title={(operateType === 'add' ? '新增' : '编辑') + '密码'}
             maskClosable={false}
             visible={true} onOk={this.onSaveData.bind(this)} onCancel={this.props.onCancel}>
        <Form>
          <FormItem
            {...GLOBAL_LAYOUT}
            label="名称"
            hasFeedback>
            {getFieldDecorator('name', {
              rules: [{
                required: true, message: '请填写名称!',
              }],
            })(<Input/>)}
          </FormItem>
          <FormItem {...GLOBAL_LAYOUT} label="类型" hasFeedback>
            {getFieldDecorator('type', {
              rules: [{
                required: true, message: '请填写类型!',
              }],
            })(<Input/>)}
          </FormItem>
          <FormItem {...GLOBAL_LAYOUT} label="host" hasFeedback>
            {getFieldDecorator('host')(<Input/>)}
          </FormItem>
          <FormItem {...GLOBAL_LAYOUT} label="帐号" hasFeedback>
            {getFieldDecorator('account')(<Input/>)}
          </FormItem>
          <FormItem {...GLOBAL_LAYOUT} label="密码" hasFeedback>
            {getFieldDecorator('password')(<Input/>)}
          </FormItem>
          <FormItem {...GLOBAL_LAYOUT} label="过期时间">
            {getFieldDecorator('expireTime')(<DatePicker/>)}
          </FormItem>
          <FormItem {...GLOBAL_LAYOUT} label="附件">
            {getFieldDecorator('attachment')(<AttachmentUploader/>)}
          </FormItem>
          <FormItem {...GLOBAL_LAYOUT} label="备注">
            {getFieldDecorator('remark')(<Input.TextArea/>)}
          </FormItem>

        </Form>
      </Modal>
    );
  }
}

PasswordFormModal.propTypes = {
  operateType: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  formData: PropTypes.object
};
PasswordFormModal = Form.create()(PasswordFormModal);
export default PasswordFormModal;
