
/**
 * Created by eaTong on 2018-30-11 .
 * Description: auto generated in  2018-30-11
 */

import React, {Component} from 'react';
import {Button, message ,Input} from 'antd';
import Reactable from "@eatong/reactable";
import PasswordModal from "./PasswordModal";
import {inject, observer} from "mobx-react";

const ButtonGroup = Button.Group;
const columns = [
  {title: '名称', dataIndex: 'name', key: 'name'},
];

@inject('password') @observer
class PasswordPage extends Component {
  async componentDidMount() {
    await this.props.password.getDataList();
  }

  render() {
    const {dataList, operateType, showModal, selectedKeys, rowSelection, firstSelected} = this.props.password;
    return (
      <div className="base-layout password-page">
        <header className="header">
          <div className="label">
            XXX管理
            <Input.Search
              className={'search'}
              placeholder={'输入关键字搜索'}
              onSearch={(val) => this.props.password.searchData(val)}
            />
          </div>
          <ButtonGroup className="buttons">
            <Button onClick={() => this.props.password.toggleModal('add')}>新建</Button>
            <Button onClick={() => this.props.password.toggleModal('edit')}
                    disabled={selectedKeys.length !== 1}>编辑</Button>
            <Button onClick={() => this.props.password.deleteData()} disabled={selectedKeys.length === 0}>删除</Button>
          </ButtonGroup>
        </header>
        <Reactable
          columns={columns}
          dataSource={dataList}
          rowKey="id"
          tableId="password-table"
          pagination={this.props.password.pagination}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: (keys) => this.props.password.onChangeSelection(keys)
          }}/>
        {showModal && (
          <PasswordModal
            onCancel={() => this.props.password.toggleModal()}
            onOk={(data) => this.props.password.onSaveData(data)}
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
