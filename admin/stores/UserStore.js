/**
 * Created by eaTong on 2018-23-06 .
 * Description: auto generated in  2018-23-06
 */

import {observable, action} from 'mobx';
import ajax from "~/utils/ajax";
import BaseStore from '~/stores/BaseStore'
import {message} from 'antd';

export default class UserStore extends BaseStore {
  listApi = '/api/user/get';
  addApi = '/api/user/add';
  updateApi = '/api/user/update';
  deleteApi = '/api/user/delete';
  detailApi = '/api/user/detail';
  @observable showGrantModal = false;

  @action
  async searchData(keywords) {
    this.queryOption = {keywords};
    this.pageIndex = 0;
    await this.getDataList();
  }

  @action toggleGrantModal() {
    this.showGrantModal = !this.showGrantModal;
  }

  @action
  async grantRole(opts) {
    await ajax({data: {...opts, userId: this.firstSelected.id}, url: '/api/user/grant'});
    this.selectedKeys = [];
    this.toggleGrantModal();
    message.success('授权成功');
    await this.getDataList();
  }
}
