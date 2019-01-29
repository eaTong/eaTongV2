/**
 * Created by eatong on 19-1-29.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal} from 'antd';

class TaskDetailModal extends Component {
  render() {
    const {title} = this.props;
    return (
      <Modal
        className={'detail-modal'}
        title={title}
        visible={true}
        footer={null}
        onCancel={this.props.onCancel}
      >
        {JSON.stringify(this.props)}
      </Modal>
    );
  }
}

TaskDetailModal.propTypes = {
  operateType: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  formData: PropTypes.object
};
export default TaskDetailModal;
