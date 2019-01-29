/**
 * Created by eaTong on 2018/6/17 .
 * Description:
 */
import {observable, action, computed, toJS} from 'mobx';
import ajax from "~/utils/ajax";
import {message} from 'antd';

const PAGE_SIZE = 20;
export default class BaseStore {
  @observable dataList = [];
  @observable operateType = 'add';
  @observable showFormModal = false;
  @observable showDetailModal = false;
  @observable selectedKeys = [];
  @observable pageIndex = 0;
  @observable pageSize = PAGE_SIZE;
  @observable total = 0;
  @observable detailData = {};

  listApi = '';
  addApi = '';
  updateApi = '';
  deleteApi = '';
  detailApi = '';
  keyMap = {};

  @computed get selectedRows() {
    return this.selectedKeys.map(key => this.keyMap[key + '']);
  }

  @computed get firstSelected() {
    return toJS(this.selectedRows[0]);
  }

  @computed get pagination() {
    return {
      showSizeChanger: true,
      hideOnSinglePage: true,
      showQuickJumper: true,
      current: this.pageIndex + 1,
      pageSize: this.pageSize,
      total: this.total,
      pageSizeOptions: ['10', '20', '50', '100', '200'],
      showTotal: (total, range) => `当前：${range[0]}-${range[1]} ，共 ${total} 条数据`,
      onShowSizeChange: (...args) => this.onChangePageSize(...args),
      onChange: (current) => this.onChangePage(current)
    }
  }

  @action clearData() {
    this.dataList = [];
    this.pageIndex = 0;
    this.total = 0;
    this.keyMap = {};
    this.showFormModal = false;
  }

  @action onChangeQueryOption(field, value) {
    const queryOption = this.queryOption || {};
    queryOption[field] = value;
    this.queryOption = queryOption;
  }

  @action toggleFormModal(operateType, visible) {
    this.operateType = operateType;
    this.showFormModal = typeof visible === 'undefined' ? !this.showFormModal : visible;
  }

  @action toggleDetailModal(visible) {
    this.showDetailModal = typeof visible === 'undefined' ? !this.showFormModal : visible;
  }

  @action onChangeSelection(selectedKeys) {
    this.selectedKeys = [...selectedKeys];
  }

  @action
  async onChangePage(current) {
    this.pageIndex = current - 1;
    await this.getDataList();
  }

  @action
  async onChangePageSize(current, pageSize) {
    this.pageIndex = 0;
    this.pageSize = pageSize;
    this.selectedKeys = [];
    await this.getDataList();
  }

  @action
  async getDataList() {
    try {
      const data = await ajax({
        url: this.listApi,
        data: {pageSize: this.pageSize, pageIndex: this.pageIndex, ...this.queryOption}
      });
      this.dataList = [];
      this.selectedKeys = [];
      let dataList;
      if (data.hasOwnProperty('total')) {
        this.total = data.total;
        dataList = data.list;
      } else {
        dataList = data;
      }
      this.dataList = dataList;
      this.mappingData(dataList);
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  getKey(data) {
    return data.id;
  }

  mappingData(list) {
    for (let item of list) {
      this.keyMap[this.getKey(item) + ''] = item;
    }
  }

  @action
  async onSaveData(formData) {
    if (/(add)|(copyAdd)/.test(this.operateType)) {
      await ajax({url: this.addApi, data: formData});
      message.success('新增成功');
      this.toggleFormModal();
      await this.getDataList();
    } else {
      await ajax({url: this.updateApi, data: {id: this.getKey(this.firstSelected), ...formData}});
      message.success('编辑成功');
      this.toggleFormModal();
      await this.getDataList();
    }
  }

  @action
  async deleteData() {
    await ajax({url: this.deleteApi, data: {ids: this.selectedKeys}});
    message.success('删除成功');
    if (this.pageIndex * this.pageSize + this.selectedKeys.length === this.total) {
      this.pageIndex = Math.max(this.pageIndex - 1, 0);
    }
    await this.getDataList();
    this.selectedKeys = [];
  }

  @action
  async viewDetail(id) {
    this.showDetailModal = true;
    await this.getDetailData(id || this.selectedKeys[0]);
  }

  @action
  async getDetailData(id) {
    this.detailData = {};
    this.detailData = await ajax({url: this.detailApi, data: {id: id || this.selectedKeys[0]}});
  }
}
