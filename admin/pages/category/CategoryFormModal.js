/**
 * Created by eaTong on 2019-10-12 .
 * Description: auto generated in  2019-10-12
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, Form, Input, message, Radio} from 'antd';
import {GLOBAL_LAYOUT} from '~/utils/constants';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class CategoryFormModal extends Component {
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
            label="名称"
            hasFeedback>
            {getFieldDecorator('name', {
              rules: [{
                required: true, message: '请填写名称!',
              }],
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem
            {...GLOBAL_LAYOUT}
            label="类型"
            >
            {getFieldDecorator('type', {
              initialValue: 0
            })(
              <RadioGroup>
                <Radio value={0}>博客</Radio>
                <Radio value={1}>笔记</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem
            {...GLOBAL_LAYOUT}
            label="描述"
            hasFeedback>
            {getFieldDecorator('description', {
              rules: [{
                required: true, message: '分类描述!',
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

CategoryFormModal.propTypes = {
  operateType: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  formData: PropTypes.object
};
CategoryFormModal = Form.create()(CategoryFormModal);
export default CategoryFormModal;
