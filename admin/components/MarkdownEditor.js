/**
 * created by eaTong at 2019/10/12
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import UploadFile from "../utils/uploadFile";
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-light.css'

class MarkdownEditor extends Component {
  static propTypes = {
    onChange: PropTypes.func
  };
  static defaultProps = {};
  mdParser = null;
  state = {
    value: ''
  };

  constructor(props) {
    super(props);
    this.mdParser = new MarkdownIt({
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value
          } catch (__) {
          }
        }
        return '' // use external default escaping
      }
    })
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({value: nextProps.value || ''})
  }

  handleEditorChange = ({html, text}) => {
    this.setState({value: text});
    const {onChange} = this.props;
    onChange && onChange(text, html);
  };

  onImageUpload = (file, callback) => {
    new UploadFile().upload(file, ({data}) => {
      callback && callback(data);
    });
  };

  render() {
    return (
      <MdEditor
        value={this.state.value}
        config={{imageAccept: '.jpg,.png,.jpeg'}}
        renderHTML={(text) => this.mdParser.render(text)}
        onChange={this.handleEditorChange}
        onImageUpload={this.onImageUpload}
      />
    )
  }
}

export default MarkdownEditor;
