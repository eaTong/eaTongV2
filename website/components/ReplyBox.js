/**
 * Created by eatong on 2020/3/18.
 */


import React, {Component} from 'react';
import {formWrapper, FormItem, Input, TextArea} from 'bulma-react-form'

class ReplyBox extends Component {
  state = {};

  submit() {
    this.props.form.getFieldsValue(async (error, values) => {
      if (!error) {
        const {onSubmit} = this.props;
        onSubmit && await onSubmit(values);
        this.props.form.setFieldsValue({content: ''})
      }
    })
  }

  render() {
    const {form} = this.props;
    return (
      <div className="container box">
        <FormItem label={'您的称呼'} field={'name'}>
          {form.getFieldDecorator('name', {rules: [{required: true, message: '放心，不会泄露您的隐私'}]})(
            <Input placeholder={'放心，不会泄露您的隐私'}/>
          )}
        </FormItem>
        <FormItem label={'邮箱'} field={'email'}>
          {form.getFieldDecorator('email')(
            <Input placeholder={'如果需要回复，我会往这个邮箱发送回复，这个不会显示'}/>
          )}
        </FormItem>
        <FormItem label={'您的网站'} field={'website'}>
          {form.getFieldDecorator('website')(
            <Input placeholder={'回复框会放置友链，别放广告，不然会被我删除。'}/>
          )}
        </FormItem>
        <FormItem label={'评论正文'} field={'content'}>
          {form.getFieldDecorator('content', {rules: [{required: true, message: '你提交一个空的评论，我要怎么办？'}]})(
            <TextArea placeholder={'这个就不解释了吧。'}/>
          )}
        </FormItem>
        <div className="field is-grouped is-grouped-right">
          <div className="control">
            <button className="button is-link " onClick={() => this.submit()}>提交</button>
          </div>
        </div>
      </div>
    )
  }
}

export default formWrapper(ReplyBox);
