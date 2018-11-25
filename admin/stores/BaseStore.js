/**
 * Created by eaTong on 2018/6/17 .
 * Description:
 */
import {observable, action, computed, toJS} from 'mobx';
import ajax from "~/util/ajaxUtil";
import {message} from 'antd';

const PAGE_SIZE = 20;
export default class BaseStore {

  @observable dataList = [];
  @observable operateType = 'add';
  @observable showModal = false;
  @observable selectedKeys = [];
  @observable pageIndex = 0;
  @observable total = 0;

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
    if (!this.total || this.total <= PAGE_SIZE) {
      return null;
    }
    return {
      current: this.pageIndex + 1,
      pageSize: PAGE_SIZE,
      total: this.total,
      onChange: (current) => this.onChangePage(current)
    }
  }

  @action clearData() {
    this.dataList = [];
    this.pageIndex = 0;
    this.total = 0;
    this.keyMap = {};
    this.showModal = false;
  }

  @action onChangeQueryOption(field, value) {
    const queryOption = this.queryOption || {};
    queryOption[field] = value;
    this.queryOption = queryOption;
  }

  @action toggleModal(operateType) {
    this.operateType = operateType;
    this.showModal = !this.showModal;
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
  async getDataList() {
    const {success, data} = await ajax({
      url: this.listApi,
      data: {pageSize: PAGE_SIZE, pageIndex: this.pageIndex, ...this.queryOption}
    });
    if (success) {
      this.dataList = [];
      this.total = data.total;
      const dataList = data.list ? data.list : data;
      this.dataList = dataList;
      this.mappingData(dataList);
    }
    return {success, data};
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
    if (this.operateType === 'add') {
      const {success} = await ajax({url: this.addApi, data: formData});
      if (success) {
        message.success('新增成功');
        this.toggleModal();
        await this.getDataList();
      }
    } else {
      const {success} = await ajax({url: this.updateApi, data: {id: this.getKey(this.firstSelected), ...formData}});
      if (success) {
        message.success('编辑成功');
        this.toggleModal();
        await this.getDataList();
      }
    }
  }

  @action
  async deleteData() {
    const {success, data} = await ajax({url: this.deleteApi, data: {ids: this.selectedKeys}});
    if (success) {
      message.success('删除成功');
      if (this.pageIndex * PAGE_SIZE + this.selectedKeys.length === this.total) {
        this.pageIndex = this.pageIndex - 1;
      }
      await this.getDataList();
      this.selectedKeys = [];
    }
  }

}
