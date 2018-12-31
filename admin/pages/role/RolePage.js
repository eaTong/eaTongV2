/**
 * Created by eaTong on 2018-23-06 .
 * Description: auto generated in  2018-23-06
 */

import React, {Component} from 'react';
import {Button, message, Input} from 'antd';
import RoleModal from "./RoleModal";
import Reactable from "@eatong/reactable";
import {inject, observer} from "mobx-react";
import GrantMenuModal from "~/pages/role/GrantMenuModal";

const ButtonGroup = Button.Group;
const columns = [
  {title: '名称', dataIndex: 'name'},
  {title: '备注', dataIndex: 'remark'},
];

@inject('role') @observer
class RolePage extends Component {
  async componentDidMount() {
    // this.props.role.clearData();
    await this.props.role.getDataList();
  }

  render() {
    const {dataList, operateType, showModal, showGrantModal, selectedKeys, rowSelection, firstSelected} = this.props.role;
    return (
      <div className="base-layout">
        <header className="title">
          角色管理
        </header>
        <div className="operate-bar">
          <ButtonGroup className="buttons">
            <Button onClick={() => this.props.role.toggleModal('add')}>新建</Button>
            <Button onClick={() => this.props.role.toggleModal('edit')}
                    disabled={selectedKeys.length !== 1}>编辑</Button>
            <Button onClick={() => this.props.role.deleteData()} disabled={selectedKeys.length === 0}>删除</Button>
            <Button onClick={() => this.props.role.toggleGrantModal()}
                    disabled={selectedKeys.length !== 1}>分配菜单</Button>
          </ButtonGroup>
        </div>

        <Reactable
          columns={columns}
          dataSource={dataList}
          rowKey="id"
          tableId="role-table"
          pagination={this.props.role.pagination}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: (keys) => this.props.role.onChangeSelection(keys)
          }}/>
        {showModal && (
          <RoleModal
            onCancel={() => this.props.role.toggleModal()}
            onOk={(data) => this.props.role.onSaveData(data)}
            operateType={operateType}
            formData={firstSelected}
          />
        )}
        {showGrantModal && (
          <GrantMenuModal
            onCancel={() => this.props.role.toggleGrantModal()}
            onOk={(data) => this.props.role.grantRole(data)}
            formData={firstSelected}
          />
        )}
      </div>
    );
  }
}

RolePage.propTypes = {};
export default RolePage;
