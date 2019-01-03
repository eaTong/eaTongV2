/**
 * Created by eaTong on 2018-30-11 .
 * Description: auto generated in  2018-30-11
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, Form, Input, message, DatePicker} from 'antd';
import moment from "moment";
import AttachmentUploader from "../../components/AttachmentUploader";

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

class PasswordModal extends Component {
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
          <FormItem {...formItemLayout} label="名称" hasFeedback>
            {getFieldDecorator('name', {
              rules: [{
                required: true, message: '请填写名称!',
              }],
            })(<Input/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="类型" hasFeedback>
            {getFieldDecorator('type', {
              rules: [{
                required: true, message: '请填写类型!',
              }],
            })(<Input/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="host" hasFeedback>
            {getFieldDecorator('host')(<Input/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="帐号" hasFeedback>
            {getFieldDecorator('account')(<Input/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="密码" hasFeedback>
            {getFieldDecorator('password')(<Input/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="过期时间">
            {getFieldDecorator('expireTime')(<DatePicker/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="附件">
            {getFieldDecorator('attachment')(<AttachmentUploader/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="备注">
            {getFieldDecorator('remark')(<Input.TextArea/>)}
          </FormItem>

        </Form>
      </Modal>
    );
  }
}

PasswordModal.propTypes = {
  operateType: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  formData: PropTypes.object
};
PasswordModal = Form.create()(PasswordModal);
export default PasswordModal;
