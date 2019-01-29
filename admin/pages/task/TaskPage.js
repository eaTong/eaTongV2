/**
 * Created by eaTong on 2018-31-12 .
 * Description: auto generated in  2018-31-12
 */

import React, {Component} from 'react';
import {Button, message, Input, Pagination} from 'antd';
import Reactable from "@eatong/reactable";
import TaskFormModal from "./TaskFormModal";
import {inject, observer} from "mobx-react";
import Title from "~/components/Title";
import PageBase from "~/components/PageBase";
import TaskDetailModal from "~/pages/task/TaskDetailModal";

const ButtonGroup = Button.Group;

@inject('task', 'app') @observer
class TaskPage extends PageBase {
  componentWillMount() {
    this.columns = [
      {
        title: '名称', key: 'name', render: (text, row) => (
          <span className="link-text" onClick={() => this.props.task.viewDetail(row.id)}>{text}</span>
        )
      },
    ];
  }

  async componentDidMount() {
    await this.props.task.getDataList();
  }

  render() {
    const {task} = this.props;
    const {dataList, operateType, showFormModal, showDetailModal, selectedKeys, firstSelected, pagination} = task;
    return (
      <div className="base-layout task-page">
        <Title title='任务管理'/>
        <div className="operate-bar">
          <Input.Search
            className={'search'}
            placeholder={'输入关键字搜索'}
            onSearch={(val) => task.searchData(val)}
          />

          <ButtonGroup className="buttons">
            <Button
              onClick={() => task.toggleFormModal('add')}
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
              onClick={() => task.toggleFormModal('edit')}
              disabled={this.disableButton('edit', selectedKeys.length !== 1)}
            >
              编辑
            </Button>
            <Button
              onClick={() => task.deleteData()}
              disabled={this.disableButton('delete', selectedKeys.length === 0)}
            >
              删除
            </Button>
          </ButtonGroup>
        </div>
        <Reactable
          columns={this.columns}
          dataSource={dataList}
          rowKey="id"
          tableId="task-table"
          pagination={task.pagination}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: (keys) => task.onChangeSelection(keys)
          }}/>
        <Pagination {...pagination}/>
        {showFormModal && (
          <TaskFormModal
            onCancel={() => task.toggleFormModal()}
            onOk={(data) => task.onSaveData(data)}
            operateType={operateType}
            formData={firstSelected}
          />
        )}
        {showDetailModal && (
          <TaskDetailModal
            title={'任务详情'}
            onCancel={() => task.toggleDetailModal(false)}
            detailData={task.detailData}
          />
        )}
      </div>
    );
  }
}

TaskPage.propTypes = {};
export default TaskPage;
