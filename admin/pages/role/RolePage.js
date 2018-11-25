/**
 * Created by eaTong on 2018-23-06 .
 * Description: auto generated in  2018-23-06
 */

import React, {Component} from 'react';
import {Button, message, Input} from 'antd';
import RoleModal from "./RoleModal";
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
        <header className="header">
          <div className="label">
            角色管理
          </div>
          <ButtonGroup className="buttons">
            <Button onClick={() => this.props.role.toggleModal('add')}>新建</Button>
            <Button onClick={() => this.props.role.toggleModal('edit')}
                    disabled={selectedKeys.length !== 1}>编辑</Button>
            <Button onClick={() => this.props.role.deleteData()} disabled={selectedKeys.length === 0}>删除</Button>
            <Button onClick={() => this.props.role.toggleGrantModal()} disabled={selectedKeys.length !== 1}>分配菜单</Button>
          </ButtonGroup>
        </header>

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
