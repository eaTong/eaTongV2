/**
 * Created by eaTong on 2019-10-31 .
 * Description: auto generated in  2019-10-31
 */

import React, {Component} from 'react';
import {Button, message, Input, Pagination} from 'antd';
import Reactable from "@eatong/reactable";
import VisiteLogFormModal from "./VisiteLogFormModal";
import {inject, observer} from "mobx-react";
import Title from "~/components/Title";
import PageBase from "~/components/PageBase";

const ButtonGroup = Button.Group;
const columns = [
  {title: 'path', key: 'path'},
  {title: 'ip', key: 'ip'},
  {title: 'method', key: 'method'},
  {title: 'userAgent', key: 'userAgent'},
  {title: '耗时', key: 'time'},
  {title: '访问时间', key: 'createdAt'},
];

@inject('visiteLog', 'app') @observer
class VisiteLogPage extends PageBase {
  async componentDidMount() {
    await this.props.visiteLog.getDataList();
  }

  render() {
    const {visiteLog} = this.props;
    const {dataList, operateType, showFormModal, selectedKeys, rowSelection, firstSelected, pagination} = visiteLog;
    return (
      <div className="base-layout visiteLog-page">
        <Title title='visiteLog管理'/>
        <div className="operate-bar">
          <Input.Search
            className={'search'}
            placeholder={'输入关键字搜索'}
            onSearch={(val) => visiteLog.searchData(val)}
          />

          <ButtonGroup className="buttons">
            <Button
              onClick={() => this.props.visiteLog.toggleFormModal('add')}
              disabled={this.disableButton('add')}
              type={'primary'}
            >
              新增
            </Button>
            <Button
              onClick={() => visiteLog.toggleFormModal('copyAdd')}
              disabled={this.disableButton('add', selectedKeys.length !== 1)}
            >
              复制并新增
            </Button>
            <Button
              onClick={() => this.props.visiteLog.toggleFormModal('edit')}
              disabled={this.disableButton('edit', selectedKeys.length !== 1)}
            >
              编辑
            </Button>
            <Button
              onClick={() => this.props.visiteLog.deleteData()}
              disabled={this.disableButton('delete', selectedKeys.length === 0)}
            >
              删除
            </Button>
            <Button
              onClick={() => this.props.visiteLog.toggleGrantModal()}
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
          tableId="visiteLog-table"
          pagination={visiteLog.pagination}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: (keys) => visiteLog.onChangeSelection(keys)
          }}/>
        {showFormModal && (
          <VisiteLogFormModal
            onCancel={() => visiteLog.toggleFormModal()}
            onOk={(data) => visiteLog.onSaveData(data)}
            operateType={operateType}
            formData={firstSelected}
          />
        )}
      </div>
    );
  }
}

VisiteLogPage.propTypes = {};
export default VisiteLogPage;
