
/**
 * Created by eaTong on 2018-31-12 .
 * Description: auto generated in  2018-31-12
 */

import React, {Component} from 'react';
import {Button, message ,Input , Pagination} from 'antd';
import Reactable from "@eatong/reactable";
import TaskModal from "./TaskModal";
import {inject, observer} from "mobx-react";

const ButtonGroup = Button.Group;
const columns = [
  {title: '名称', key: 'name'},
];

@inject('task') @observer
class TaskPage extends Component {
  async componentDidMount() {
    await this.props.task.getDataList();
  }

  render() {
    const {task} = this.props;
    const {dataList, operateType, showModal, selectedKeys, rowSelection, firstSelected , pagination} = task;
    return (
      <div className="base-layout task-page">
        <header className="title">
          任务管理
        </header>
        <div className="operate-bar">
          <Input.Search
            className={'search'}
            placeholder={'输入关键字搜索'}
            onSearch={(val) => task.searchData(val)}
          />
          <ButtonGroup className="buttons">
            <Button onClick={() => task.toggleModal('add')} type='primary'>新增</Button>
            <Button onClick={() => task.toggleModal('edit')}
                    disabled={selectedKeys.length !== 1}>编辑</Button>
            <Button onClick={() => task.deleteData()} disabled={selectedKeys.length === 0}>删除</Button>
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
