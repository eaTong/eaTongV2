/**
 * Created by eaTong on 2018-23-06 .
 * Description: auto generated in  2018-23-06
 */

import React, {Component} from 'react';
import {Button, message, Input} from 'antd';
import Reactable from '@eatong/reactable';
import UserModal from "./UserModal";
import {inject, observer} from "mobx-react";
import GrantRoleModal from "~/pages/user/GrantRoleModal";

const ButtonGroup = Button.Group;
const columns = [
  {title: '名称', dataIndex: 'name', key: 'name'},
  {title: '账号', dataIndex: 'account'},
  {title: '角色', dataIndex: 'roles', render: (val) => val.map(role => role.name).join('、')}
];

@inject('user') @observer
class UserPage extends Component {
  async componentDidMount() {
    await this.props.user.getDataList();
  }

  render() {
    const {dataList, operateType, showModal, showGrantModal, selectedKeys, rowSelection, firstSelected} = this.props.user;
    return (
      <div className="base-layout">
        <header className="title">
          用户管理
        </header>
        <div className="operate-bar">
          <ButtonGroup className="buttons">
            <Button onClick={() => this.props.user.toggleModal('add')}>新建</Button>
            <Button onClick={() => this.props.user.toggleModal('edit')}
                    disabled={selectedKeys.length !== 1}>编辑</Button>
            <Button onClick={() => this.props.user.deleteData()} disabled={selectedKeys.length === 0}>删除</Button>
            <Button onClick={() => this.props.user.toggleGrantModal()}
                    disabled={selectedKeys.length !== 1}>分配角色</Button>
          </ButtonGroup>
        </div>
        <Reactable
          columns={columns}
          dataSource={dataList}
          rowKey="id"
          tableId="user-table"
          pagination={this.props.user.pagination}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: (keys) => this.props.user.onChangeSelection(keys)
          }}/>
        {showModal && (
          <UserModal
            onCancel={() => this.props.user.toggleModal()}
            onOk={(data) => this.props.user.onSaveData(data)}
            operateType={operateType}
            formData={firstSelected}
          />
        )}
        {showGrantModal && (
          <GrantRoleModal
            onCancel={() => this.props.user.toggleGrantModal()}
            onOk={(data) => this.props.user.grantRole(data)}
            formData={firstSelected}
          />
        )}
      </div>
    );
  }
}

UserPage.propTypes = {};
export default UserPage;
