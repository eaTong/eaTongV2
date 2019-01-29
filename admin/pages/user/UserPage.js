/**
 * Created by eaTong on 2018-23-06 .
 * Description: auto generated in  2018-23-06
 */

import React, {Component} from 'react';
import {Button, message, Input, Pagination} from 'antd';
import Reactable from '@eatong/reactable';
import UserModal from "./UserModal";
import {inject, observer} from "mobx-react";
import GrantRoleModal from "~/pages/user/GrantRoleModal";
import Title from "~/components/Title";
import PageBase from "~/components/PageBase";

const ButtonGroup = Button.Group;
const columns = [
  {title: '名称', dataIndex: 'name', key: 'name'},
  {title: '账号', dataIndex: 'account'},
  {title: '角色', dataIndex: 'roles', render: (val) => val.map(role => role.name).join('、')}
];

@inject('user', 'app') @observer
class UserPage extends PageBase {
  async componentDidMount() {
    await this.props.user.getDataList();
  }

  render() {
    const {user} = this.props;
    const {dataList, operateType, showFormModal, showGrantModal, selectedKeys, firstSelected, pagination} = user;
    return (
      <div className="base-layout">
        <Title title='用户管理'/>
        <div className="operate-bar">
          <ButtonGroup className="buttons">
            <Button
              onClick={() => user.toggleFormModal('add')}
              disabled={this.disableButton('add')}
              type={'primary'}
            >
              新增
            </Button>
            <Button
              onClick={() => user.toggleFormModal('edit')}
              disabled={this.disableButton('edit', selectedKeys.length !== 1)}
            >
              编辑
            </Button>
            <Button
              onClick={() => user.deleteData()}
              disabled={this.disableButton('delete', selectedKeys.length === 0)}
            >
              删除
            </Button>
            <Button
              onClick={() => user.toggleGrantModal()}
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
          tableId="user-table"
          pagination={pagination}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: (keys) => user.onChangeSelection(keys)
          }}/>
        <Pagination {...pagination}/>
        {showFormModal && (
          <UserModal
            onCancel={() => user.toggleFormModal()}
            onOk={(data) => user.onSaveData(data)}
            operateType={operateType}
            formData={firstSelected}
          />
        )}
        {showGrantModal && (
          <GrantRoleModal
            onCancel={() => user.toggleGrantModal()}
            onOk={(data) => user.grantRole(data)}
            formData={firstSelected}
          />
        )}
      </div>
    );
  }
}

UserPage.propTypes = {};
export default UserPage;
