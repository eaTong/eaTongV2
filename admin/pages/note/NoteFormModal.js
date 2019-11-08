/**
 * Created by eaTong on 2019-11-08 .
 * Description: auto generated in  2019-11-08
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, Form, Input, message} from 'antd';
import {GLOBAL_LAYOUT} from '~/utils/constants';

const FormItem = Form.Item;

class NoteFormModal extends Component {
  componentDidMount() {
    if (/(edit)|(copyAdd)/.test(this.props.operateType)) {
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
      <Modal title={(operateType === 'add' ? '新增' : '编辑') + ''}
             maskClosable={false}
             visible={true} onOk={this.onSaveData.bind(this)} onCancel={this.props.onCancel}>
        <Form>
          <FormItem
            {...GLOBAL_LAYOUT}
            label="标题"
            hasFeedback>
            {getFieldDecorator('title', {
              rules: [{
                required: true, message: '请填写标题!',
              }],
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem
            {...GLOBAL_LAYOUT}
            label="正文"
            hasFeedback>
            {getFieldDecorator('content', {
              rules: [{
                required: true, message: '请填写正文!',
              }],
            })(
              <Input.TextArea/>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

NoteFormModal.propTypes = {
  operateType: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  formData: PropTypes.object
};
NoteFormModal = Form.create()(NoteFormModal);
export default NoteFormModal;
