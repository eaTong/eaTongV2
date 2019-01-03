/**
 * Created by eaTong on 2018-23-06 .
 * Description: auto generated in  2018-23-06
 */

import React, {Component} from 'react';
import {Button, message, Input, Pagination} from 'antd';
import RoleModal from "./RoleModal";
import Reactable from "@eatong/reactable";
import {inject, observer} from "mobx-react";
import GrantMenuModal from "~/pages/role/GrantMenuModal";
import Title from "~/components/Title";
import PageBase from "~/components/PageBase";

const ButtonGroup = Button.Group;
const columns = [
  {title: '名称', dataIndex: 'name'},
  {title: '备注', dataIndex: 'remark'},
];

@inject('role', 'app') @observer
class RolePage extends PageBase {
  async componentDidMount() {
    // this.props.role.clearData();
    await this.props.role.getDataList();
  }

  render() {
    const {dataList, operateType, showModal, showGrantModal, selectedKeys, rowSelection, firstSelected, pagination} = this.props.role;
    return (
      <div className="base-layout">
        <Title title='角色管理'/>
        <div className="operate-bar">

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
              分配菜单
            </Button>
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

        <Pagination {...pagination}/>
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
