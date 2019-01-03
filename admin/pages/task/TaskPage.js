
/**
 * Created by eaTong on 2018-31-12 .
 * Description: auto generated in  2018-31-12
 */

import React, {Component} from 'react';
import {Button, message ,Input , Pagination} from 'antd';
import Reactable from "@eatong/reactable";
import TaskModal from "./TaskModal";
import {inject, observer} from "mobx-react";
import Title from "~/components/Title";
import PageBase from "~/components/PageBase";

const ButtonGroup = Button.Group;
const columns = [
  {title: '名称', key: 'name'},
];

@inject('task', 'app') @observer
class TaskPage extends PageBase {
  async componentDidMount() {
    await this.props.task.getDataList();
  }

  render() {
    const {task} = this.props;
    const {dataList, operateType, showModal, selectedKeys, rowSelection, firstSelected , pagination} = task;
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
              onClick={() => this.props.task.toggleModal('add')}
              disabled={this.disableButton('add')}
              type={'primary'}
            >
              新增
            </Button>
            <Button
              onClick={() => this.props.task.toggleModal('edit')}
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
        <Pagination {...pagination}/>
        {showModal && (
          <TaskModal
            onCancel={() => task.toggleModal()}
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
