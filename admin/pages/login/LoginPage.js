/**
 * Created by eaTong on 2018/11/25 .
 * Description:
 */
import React, {Component} from 'react';
import {Form, Input, Button, Icon} from 'antd';
import './login.less';
import {inject, observer} from 'mobx-react';

const FormItem = Form.Item;

@inject('app') @observer
class LoginPage extends Component {
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        await this.props.app.login(values);
        this.props.history.push('/admin');
      }
    });
  }

  render() {
    const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
    return (
      <div className={'login-page'}>
        <div className="login-frame">
          <Form layout="inline" onSubmit={(e) => this.handleSubmit(e)}>
            <FormItem>
              {getFieldDecorator('account', {
                rules: [{required: true, message: 'Please input your username!'}],
              })(
                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="Username"/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{required: true, message: 'Please input your Password!'}],
              })(
                <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                       placeholder="Password"/>
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">
                Log in
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create()(LoginPage);
