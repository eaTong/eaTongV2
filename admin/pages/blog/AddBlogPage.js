/**
 * created by eaTong at 2019/10/12
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Button} from 'antd';
import MarkdownEditor from "../../components/MarkdownEditor";
import AsyncSelect from "../../components/AsyncSelect";
import {inject, observer} from "mobx-react";
import ImageUploader from "~/components/ImageUploader";

const FormItem = Form.Item;

@inject('blog', 'app') @observer
class AddBlogPage extends Component {
  static propTypes = {};
  static defaultProps = {};

  async componentDidMount() {
    if (this.props.operate === 'edit') {
      const {blog, id, form} = this.props;
      const detail = await blog.getDetailData(id);
      form.setFieldsValue({...detail, categoryId: String(detail.categoryId)});
    }
  }

  submit = () => {
    this.props.form.validateFields(async (error, value) => {
      if (!error) {
        if (this.props.operate === 'edit') {
          await this.props.blog.updateDataDirect({...value, id: this.props.id});
        } else {
          await this.props.blog.addData(value);
          this.props.form.resetFields();
        }
      }
    })
  };

  render() {
    const {form} = this.props;
    const {getFieldDecorator} = form;
    return (
      <div className="add-blog-page base-layout">
        <div className="form-line">
          <div className="form-item">
            <FormItem label={'标题'} className={'line'}>
              {getFieldDecorator('title', {rules: [{required: true, message: '标题都不填，写什么博客'}]})(
                <Input placeholder={'博客标题'}/>
              )}
            </FormItem>
            <FormItem label={'分类'} className={'line'}>
              {getFieldDecorator('categoryId', {rules: [{required: true, message: '文章分类都不填，写什么博客'}]})(
                <AsyncSelect
                  placeholder={'文章分类'}
                  asyncUrl={'/api/category/get'}
                  filterResolve={keywords => ({keywords, type: 0})}
                />
              )}
            </FormItem>
          </div>
          <div className="form-item">
            <FormItem label={'封面'} className={'line'}>
              {getFieldDecorator('coverImage')(
                <ImageUploader maxCount={1}/>
              )}
            </FormItem>
          </div>
        </div>
        <div className="content">
          {getFieldDecorator('content', {rules: [{required: true, message: '内容都不填，写什么博客'}]})(
            <MarkdownEditor/>
          )}
        </div>
        <div className="line submit">
          <Button type={'primary'} onClick={this.submit}>保存</Button>
        </div>
      </div>
    )
  }
}

AddBlogPage = Form.create()(AddBlogPage);
export default AddBlogPage;
