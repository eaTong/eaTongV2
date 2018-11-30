
/**
 * Created by eaTong on 2018-25-11 .
 * Description: auto generated in  2018-25-11
 */

import React, {Component} from 'react';
import {Button, message ,Input} from 'antd';
import Reactable from "@eatong/reactable";
import TaskModal from "./TaskModal";
import {inject, observer} from "mobx-react";

const ButtonGroup = Button.Group;
const columns = [
  {title: '名称', dataIndex: 'name', key: 'name'},
];

@inject('task') @observer
class TaskPage extends Component {
  async componentDidMount() {
    await this.props.task.getDataList();
  }

  render() {
    const {dataList, operateType, showModal, selectedKeys, rowSelection, firstSelected} = this.props.task;
    return (
      <div className="base-layout task-page">
        <header className="header">
          <div className="label">
            用户管理
            <Input.Search
              className={'search'}
              placeholder={'输入关键字搜索'}
              onSearch={(val) => this.props.task.searchData(val)}
            />
          </div>
          <ButtonGroup className="buttons">
            <Button onClick={() => this.props.task.toggleModal('add')}>新建</Button>
            <Button onClick={() => this.props.task.toggleModal('edit')}
                    disabled={selectedKeys.length !== 1}>编辑</Button>
            <Button onClick={() => this.props.task.deleteData()} disabled={selectedKeys.length === 0}>删除</Button>
          </ButtonGroup>
        </header>
        <Reactable
          columns={columns}
          dataSource={dataList}
          rowKey="id"
          tableId="role-table"
          pagination={this.props.task.pagination}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: (keys) => this.props.task.onChangeSelection(keys)
          }}/>

        {showModal && (
          <TaskModal
            onCancel={() => this.props.task.toggleModal()}
            onOk={(data) => this.props.task.onSaveData(data)}
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
