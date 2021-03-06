
/**
 * Created by eaTong on 2019-03-15 .
 * Description: auto generated in  2019-03-15
 */

import React, {Component} from 'react';
import {Button, message ,Input , Pagination} from 'antd';
import Reactable from "@eatong/reactable";
import PasswordFormModal from "./PasswordFormModal";
import {inject, observer} from "mobx-react";
import Title from "~/components/Title";
import PageBase from "~/components/PageBase";

const ButtonGroup = Button.Group;
const columns = [
  {title: '名称', key: 'name'},
  {title: '类型', key: 'type'},
  {title: 'host', key: 'host', width: 200},
  {title: '帐号', key: 'account', width: 150},
  {title: '密码', key: 'password', width: 150},
  {title: '过期时间', key: 'expireTime'},
  {title: '备注', key: 'remark'},
];

@inject('password','app') @observer
class PasswordPage extends PageBase {
  async componentDidMount() {
    await this.props.password.getDataList();
  }

  render() {
    const {password} = this.props;
    const {dataList, operateType, showFormModal, selectedKeys,  firstSelected, pagination} = password;
    return (
      <div className="base-layout password-page">
        <Title title='密码管理'/>
        <div className="operate-bar">
          <Input.Search
            className={'search'}
            placeholder={'输入关键字搜索'}
            onSearch={(val) => password.searchData(val)}
          />

          <ButtonGroup className="buttons">
            <Button
              onClick={() => this.props.password.toggleFormModal('add')}
              disabled={this.disableButton('add')}
              type={'primary'}
            >
              新增
            </Button>
            <Button
              onClick={() => password.toggleFormModal('copyAdd')}
              disabled={this.disableButton('add', selectedKeys.length !== 1)}
            >
              复制并新增
            </Button>
            <Button
              onClick={() => this.props.password.toggleFormModal('edit')}
              disabled={this.disableButton('edit', selectedKeys.length !== 1)}
            >
              编辑
            </Button>
            <Button
              onClick={() => this.props.password.deleteData()}
              disabled={this.disableButton('delete', selectedKeys.length === 0)}
            >
              删除
            </Button>
            <Button
              onClick={() => this.props.password.toggleGrantModal()}
              disabled={this.disableButton('grant', selectedKeys.length !== 1)}
            >
              分配角色
            </Button>
          </ButtonGroup>
        </div>
        <Reactable
          columns={columns}
          dataSource={dataList}
          rowKey="id"
          tableId="password-table"
          pagination={password.pagination}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: (keys) => password.onChangeSelection(keys)
          }}/>
        {showFormModal && (
          <PasswordFormModal
            onCancel={() => password.toggleFormModal()}
            onOk={(data) => password.onSaveData(data)}
            operateType={operateType}
            formData={firstSelected}
          />
        )}
      </div>
    );
  }
}

PasswordPage.propTypes = {};
export default PasswordPage;
