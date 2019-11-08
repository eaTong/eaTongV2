/**
 * Created by eaTong on 2019-11-08 .
 * Description: auto generated in  2019-11-08
 */

import React, {Component} from 'react';
import {Button, message, Input} from 'antd';
import Reactable from "@eatong/reactable";
import NoteFormModal from "./NoteFormModal";
import {inject, observer} from "mobx-react";
import Title from "~/components/Title";
import PageBase from "~/components/PageBase";

const ButtonGroup = Button.Group;
const columns = [
  {title: '标题', key: 'title'},
  {title: '正文', key: 'content'},
  {title: '创建时间', key: 'createdAt'},
];

@inject('note', 'app') @observer
class NotePage extends PageBase {
  async componentDidMount() {
    await this.props.note.getDataList();
  }

  render() {
    const {note} = this.props;
    const {dataList, operateType, showFormModal, selectedKeys, rowSelection, firstSelected, pagination} = note;
    return (
      <div className="base-layout note-page">
        <Title title='note管理'/>
        <div className="operate-bar">
          <Input.Search
            className={'search'}
            placeholder={'输入关键字搜索'}
            onSearch={(val) => note.searchData(val)}
          />

          <ButtonGroup className="buttons">
            <Button
              onClick={() => this.props.note.toggleFormModal('add')}
              disabled={this.disableButton('add')}
              type={'primary'}
            >
              新增
            </Button>
            <Button
              onClick={() => note.toggleFormModal('copyAdd')}
              disabled={this.disableButton('add', selectedKeys.length !== 1)}
            >
              复制并新增
            </Button>
            <Button
              onClick={() => this.props.note.toggleFormModal('edit')}
              disabled={this.disableButton('edit', selectedKeys.length !== 1)}
            >
              编辑
            </Button>
            <Button
              onClick={() => this.props.note.deleteData()}
              disabled={this.disableButton('delete', selectedKeys.length === 0)}
            >
              删除
            </Button>
            <Button
              onClick={() => this.props.note.toggleGrantModal()}
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
          tableId="note-table"
          pagination={note.pagination}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: (keys) => note.onChangeSelection(keys)
          }}/>
        {showFormModal && (
          <NoteFormModal
            onCancel={() => note.toggleFormModal()}
            onOk={(data) => note.onSaveData(data)}
            operateType={operateType}
            formData={firstSelected}
          />
        )}
      </div>
    );
  }
}

NotePage.propTypes = {};
export default NotePage;
