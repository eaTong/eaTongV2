/**
 * Created by eaTong on 2019-10-10 .
 * Description: auto generated in  2019-10-10
 */

import React, {Component} from 'react';
import {Button, message, Input, Pagination} from 'antd';
import Reactable from "@eatong/reactable";
import BlogFormModal from "./BlogFormModal";
import {inject, observer} from "mobx-react";
import Title from "~/components/Title";
import PageBase from "~/components/PageBase";

const ButtonGroup = Button.Group;
const columns = [
  {title: '标题', key: 'title'},
  {title: '描述', key: 'description'},
  {title: '字数', key: 'contentSize'},
  {title: '阅读数', key: 'viewCount'},
  {title: '所属分类', dataIndex: 'category', render: (val) => val.name}
];

@inject('blog', 'app') @observer
class BlogPage extends PageBase {
  async componentDidMount() {
    await this.props.blog.getDataList();
  }

  editBlog() {
    const {app, blog} = this.props;
    app.addTab(`/admin/blog/add?type=edit&id=${blog.firstSelected.id}`, `编辑：${blog.firstSelected.title}`, {
      operate: 'edit',
      id: blog.firstSelected.id
    });
  }

  render() {
    const {blog} = this.props;
    const {dataList, operateType, showFormModal, selectedKeys, rowSelection, firstSelected, pagination} = blog;
    return (
      <div className="base-layout blog-page">
        <Title title='blog管理'/>
        <div className="operate-bar">
          <Input.Search
            className={'search'}
            placeholder={'输入关键字搜索'}
            onSearch={(val) => blog.searchData(val)}
          />

          <ButtonGroup className="buttons">
            <Button
              onClick={() => this.editBlog()}
              disabled={this.disableButton('edit', selectedKeys.length !== 1)}
            >
              编辑
            </Button>
            <Button
              onClick={() => this.props.blog.deleteData()}
              disabled={this.disableButton('delete', selectedKeys.length === 0)}
            >
              删除
            </Button>
            <Button
              onClick={() => this.props.blog.toggleGrantModal()}
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
          tableId="blog-table"
          pagination={blog.pagination}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: (keys) => blog.onChangeSelection(keys)
          }}/>
        {showFormModal && (
          <BlogFormModal
            onCancel={() => blog.toggleFormModal()}
            onOk={(data) => blog.onSaveData(data)}
            operateType={operateType}
            formData={firstSelected}
          />
        )}
      </div>
    );
  }
}

BlogPage.propTypes = {};
export default BlogPage;
