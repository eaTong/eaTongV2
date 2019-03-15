
/**
 * Created by eaTong on 2019-03-15 .
 * Description: auto generated in  2019-03-15
 */

  import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, Form, Input, message} from 'antd';
import {GLOBAL_LAYOUT} from '~/utils/constants';
import AttachmentUploader from "../../components/AttachmentUploader";

const FormItem = Form.Item;

class FileFormModal extends Component {
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
          <FormItem {...GLOBAL_LAYOUT} label="类型" hasFeedback>
            {getFieldDecorator('type', {
              rules: [{
                required: true, message: '请填写类型!',
              }],
            })(<Input/>)}
          </FormItem>
          <FormItem {...GLOBAL_LAYOUT} label="附件">
            {getFieldDecorator('attachment')(<AttachmentUploader/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

FileFormModal.propTypes = {
  operateType: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  formData: PropTypes.object
};
FileFormModal = Form.create()(FileFormModal);
export default FileFormModal;
