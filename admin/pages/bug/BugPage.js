
/**
 * Created by eaTong on 2019-01-18 .
 * Description: auto generated in  2019-01-18
 */

import React, {Component} from 'react';
import {Button, message ,Input , Pagination} from 'antd';
import Reactable from "@eatong/reactable";
import BugModal from "./BugModal";
import {inject, observer} from "mobx-react";
import Title from "~/components/Title";
import PageBase from "~/components/PageBase";

const ButtonGroup = Button.Group;
const columns = [
  {title: '名称', key: 'name'},
];

@inject('bug','app') @observer
class BugPage extends PageBase {
  async componentDidMount() {
    await this.props.bug.getDataList();
  }

  render() {
    const {bug} = this.props;
    const {dataList, operateType, showModal, selectedKeys, rowSelection, firstSelected , pagination} = bug;
    return (
      <div className="base-layout bug-page">
        <Title title='XX管理'/>
        <div className="operate-bar">
          <Input.Search
            className={'search'}
            placeholder={'输入关键字搜索'}
            onSearch={(val) => bug.searchData(val)}
          />

          <ButtonGroup className="buttons">
            <Button
              onClick={() => this.props.bug.toggleModal('add')}
              disabled={this.disableButton('add')}
              type={'primary'}
            >
              新增
            </Button>
            <Button
              onClick={() => bug.toggleModal('copyAdd')}
              disabled={this.disableButton('add', selectedKeys.length !== 1)}
            >
              复制并新增
            </Button>
            <Button
              onClick={() => this.props.bug.toggleModal('edit')}
              disabled={this.disableButton('edit', selectedKeys.length !== 1)}
            >
              编辑
            </Button>
            <Button
              onClick={() => this.props.bug.deleteData()}
              disabled={this.disableButton('delete', selectedKeys.length === 0)}
            >
              删除
            </Button>
            <Button
              onClick={() => this.props.bug.toggleGrantModal()}
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
          tableId="bug-table"
          pagination={bug.pagination}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: (keys) => bug.onChangeSelection(keys)
          }}/>
        <Pagination {...pagination}/>
        {showModal && (
          <BugModal
            onCancel={() => bug.toggleModal()}
            onOk={(data) => bug.onSaveData(data)}
            operateType={operateType}
            formData={firstSelected}
          />
        )}
      </div>
    );
  }
}

BugPage.propTypes = {};
export default BugPage;
