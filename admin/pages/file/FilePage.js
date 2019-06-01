
/**
 * Created by eaTong on 2019-03-15 .
 * Description: auto generated in  2019-03-15
 */

import React, {Component} from 'react';
import {Button, message ,Input , Pagination} from 'antd';
import Reactable from "@eatong/reactable";
import FileFormModal from "./FileFormModal";
import {inject, observer} from "mobx-react";
import Title from "~/components/Title";
import PageBase from "~/components/PageBase";

const ButtonGroup = Button.Group;
const columns = [
  {title: '名称', key: 'name'},
];

@inject('file','app') @observer
class FilePage extends PageBase {
  async componentDidMount() {
    await this.props.file.getDataList();
  }

  render() {
    const {file} = this.props;
    const {dataList, operateType, showFormModal, selectedKeys, rowSelection, firstSelected , pagination} = file;
    return (
      <div className="base-layout file-page">
        <Title title='file管理'/>
        <div className="operate-bar">
          <Input.Search
            className={'search'}
            placeholder={'输入关键字搜索'}
            onSearch={(val) => file.searchData(val)}
          />

          <ButtonGroup className="buttons">
            <Button
              onClick={() => this.props.file.toggleFormModal('add')}
              disabled={this.disableButton('add')}
              type={'primary'}
            >
              新增
            </Button>
            <Button
              onClick={() => file.toggleFormModal('copyAdd')}
              disabled={this.disableButton('add', selectedKeys.length !== 1)}
            >
              复制并新增
            </Button>
            <Button
              onClick={() => this.props.file.toggleFormModal('edit')}
              disabled={this.disableButton('edit', selectedKeys.length !== 1)}
            >
              编辑
            </Button>
            <Button
              onClick={() => this.props.file.deleteData()}
              disabled={this.disableButton('delete', selectedKeys.length === 0)}
            >
              删除
            </Button>
            <Button
              onClick={() => this.props.file.toggleGrantModal()}
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
          tableId="file-table"
          pagination={file.pagination}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: (keys) => file.onChangeSelection(keys)
          }}/>
        {showFormModal && (
          <FileFormModal
            onCancel={() => file.toggleFormModal()}
            onOk={(data) => file.onSaveData(data)}
            operateType={operateType}
            formData={firstSelected}
          />
        )}
      </div>
    );
  }
}

FilePage.propTypes = {};
export default FilePage;
