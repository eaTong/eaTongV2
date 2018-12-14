/**
 * Created by eatong on 17-12-6.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {message, Upload, Icon} from "antd";

class AttachmentUploader extends Component {
  state = {
    loading: false
  };

  handleChange(info, a, b, c) {

    const status = info.file.status;
    switch (status) {
      case 'uploading':
        this.setState({loading: true});
        break;
      case 'done':
        this.setState({loading: false});
        const {file: {response: {data}}} = info;
        const {onChange, value} = this.props;
        onChange && onChange([...(value || []), data]);
    }

  }

  render() {
    const {value} = this.props;
    const fileList = (value || []).map(item => (
      {uid: item, name: item, status: 'done', url: `/upload/img/${item}`}
    ));
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'}/>
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    return (
      <div>
        <Upload
          action="/api/file/upload"
          listType="picture-card"
          defaultFileList={fileList}
          onChange={this.handleChange.bind(this)}
        >
          {uploadButton}
        </Upload>

      </div>
    );
  }
}

AttachmentUploader.propTypes = {
  maxCount: PropTypes.number
};
export default AttachmentUploader;
