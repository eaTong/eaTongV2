
/**
 * Created by eaTong on 2019-03-15 .
 * Description: auto generated in  2019-03-15
 */

import React, {Component} from 'react';
import {Button, message ,Input , Pagination} from 'antd';
import Reactable from "@eatong/reactable";
import TaskFormModal from "./TaskFormModal";
import {inject, observer} from "mobx-react";
import Title from "~/components/Title";
import PageBase from "~/components/PageBase";

const ButtonGroup = Button.Group;
const columns = [
  {title: '名称', key: 'name'},
];

@inject('task','app') @observer
class TaskPage extends PageBase {
  async componentDidMount() {
    await this.props.task.getDataList();
  }

  render() {
    const {task} = this.props;
    const {dataList, operateType, showFormModal, selectedKeys, rowSelection, firstSelected , pagination} = task;
    return (
      <div className="base-layout task-page">
        <Title title='task管理'/>
        <div className="operate-bar">
          <Input.Search
            className={'search'}
            placeholder={'输入关键字搜索'}
            onSearch={(val) => task.searchData(val)}
          />

          <ButtonGroup className="buttons">
            <Button
              onClick={() => this.props.task.toggleFormModal('add')}
              disabled={this.disableButton('add')}
              type={'primary'}
            >
              新增
            </Button>
            <Button
              onClick={() => task.toggleFormModal('copyAdd')}
              disabled={this.disableButton('add', selectedKeys.length !== 1)}
            >
              复制并新增
            </Button>
            <Button
              onClick={() => this.props.task.toggleFormModal('edit')}
              disabled={this.disableButton('edit', selectedKeys.length !== 1)}
            >
              编辑
            </Button>
            <Button
              onClick={() => this.props.task.deleteData()}
              disabled={this.disableButton('delete', selectedKeys.length === 0)}
            >
              删除
            </Button>
            <Button
              onClick={() => this.props.task.toggleGrantModal()}
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
          tableId="task-table"
          pagination={task.pagination}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: (keys) => task.onChangeSelection(keys)
          }}/>
        {showFormModal && (
          <TaskFormModal
            onCancel={() => task.toggleFormModal()}
            onOk={(data) => task.onSaveData(data)}
            operateType={operateType}
            formData={firstSelected}
          />
        )}
      </div>
    );
  }
}

TaskPage.propTypes = {};
export default TaskPage;
