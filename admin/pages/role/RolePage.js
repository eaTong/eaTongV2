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
    await this.props.role.getDataList();
  }

  render() {
    const {role} = this.props;
    const {dataList, operateType, showFormModal, showGrantModal, selectedKeys, firstSelected, pagination} = role;
    return (
      <div className="base-layout">
        <Title title='角色管理'/>
        <div className="operate-bar">

          <ButtonGroup className="buttons">
            <Button
              onClick={() => role.toggleFormModal('add')}
              disabled={this.disableButton('add')}
              type={'primary'}
            >
              新增
            </Button>
            <Button
              onClick={() => role.toggleFormModal('edit')}
              disabled={this.disableButton('edit', selectedKeys.length !== 1)}
            >
              编辑
            </Button>
            <Button
              onClick={() => role.deleteData()}
              disabled={this.disableButton('delete', selectedKeys.length === 0)}
            >
              删除
            </Button>
            <Button
              onClick={() => role.toggleGrantModal()}
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
          pagination={role.pagination}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: (keys) => role.onChangeSelection(keys)
          }}/>

        <Pagination {...pagination}/>
        {showFormModal && (
          <RoleModal
            onCancel={() => role.toggleFormModal()}
            onOk={(data) => role.onSaveData(data)}
            operateType={operateType}
            formData={firstSelected}
          />
        )}
        {showGrantModal && (
          <GrantMenuModal
            onCancel={() => role.toggleGrantModal()}
            onOk={(data) => role.grantRole(data)}
            formData={firstSelected}
          />
        )}
      </div>
    );
  }
}

RolePage.propTypes = {};
export default RolePage;
