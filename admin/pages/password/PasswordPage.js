/**
 * Created by eaTong on 2018-30-11 .
 * Description: auto generated in  2018-30-11
 */

import React, {Component} from 'react';
import {Button, message, Input, Pagination} from 'antd';
import Reactable from "@eatong/reactable";
import PasswordModal from "./PasswordModal";
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

@inject('password', 'app') @observer
class PasswordPage extends PageBase {
  async componentDidMount() {
    await this.props.password.getDataList();
  }

  render() {
    const {password} = this.props;
    const {dataList, operateType, showModal, selectedKeys, rowSelection, firstSelected, pagination} = password;
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
              onClick={() => this.props.role.toggleModal('add')}
              disabled={this.disableButton('add')}
              type={'primary'}
            >
              新增
            </Button>
            <Button
              onClick={() => this.props.role.toggleModal('edit')}
              disabled={this.disableButton('edit', selectedKeys.length !== 1)}
            >
              编辑
            </Button>
            <Button
              onClick={() => this.props.role.deleteData()}
              disabled={this.disableButton('delete', selectedKeys.length === 0)}
            >
              删除
            </Button>
            <Button
              onClick={() => this.props.role.toggleGrantModal()}
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
        <Pagination {...pagination}/>
        {showModal && (
          <PasswordModal
            onCancel={() => password.toggleModal()}
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
