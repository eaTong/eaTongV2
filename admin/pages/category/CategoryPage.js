/**
 * Created by eaTong on 2019-10-12 .
 * Description: auto generated in  2019-10-12
 */

import React, {Component} from 'react';
import {Button, message, Input, Pagination} from 'antd';
import Reactable from "@eatong/reactable";
import CategoryFormModal from "./CategoryFormModal";
import {inject, observer} from "mobx-react";
import Title from "~/components/Title";
import PageBase from "~/components/PageBase";

const ButtonGroup = Button.Group;
const columns = [
  {title: '名称', key: 'name'},
  {title: '类型', key: 'type', render: (text) => text ? '笔记' : '博客'},
  {title: '描述', key: 'description'},

];

@inject('category', 'app') @observer
class CategoryPage extends PageBase {
  async componentDidMount() {
    await this.props.category.getDataList();
  }

  render() {
    const {category} = this.props;
    const {dataList, operateType, showFormModal, selectedKeys, rowSelection, firstSelected, pagination} = category;
    return (
      <div className="base-layout category-page">
        <Title title='分类管理'/>
        <div className="operate-bar">
          <Input.Search
            className={'search'}
            placeholder={'输入关键字搜索'}
            onSearch={(val) => category.searchData(val)}
          />

          <ButtonGroup className="buttons">
            <Button
              onClick={() => this.props.category.toggleFormModal('add')}
              disabled={this.disableButton('add')}
              type={'primary'}
            >
              新增
            </Button>
            <Button
              onClick={() => category.toggleFormModal('copyAdd')}
              disabled={this.disableButton('add', selectedKeys.length !== 1)}
            >
              复制并新增
            </Button>
            <Button
              onClick={() => this.props.category.toggleFormModal('edit')}
              disabled={this.disableButton('edit', selectedKeys.length !== 1)}
            >
              编辑
            </Button>
            <Button
              onClick={() => this.props.category.deleteData()}
              disabled={this.disableButton('delete', selectedKeys.length === 0)}
            >
              删除
            </Button>
            <Button
              onClick={() => this.props.category.toggleGrantModal()}
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
          tableId="category-table"
          pagination={category.pagination}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: (keys) => category.onChangeSelection(keys)
          }}/>
        <Pagination {...pagination}/>
        {showFormModal && (
          <CategoryFormModal
            onCancel={() => category.toggleFormModal()}
            onOk={(data) => category.onSaveData(data)}
            operateType={operateType}
            formData={firstSelected}
          />
        )}
      </div>
    );
  }
}

CategoryPage.propTypes = {};
export default CategoryPage;
