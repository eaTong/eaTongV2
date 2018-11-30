
/**
 * Created by eaTong on 2018-30-11 .
 * Description: auto generated in  2018-30-11
 */

import {observable, action} from 'mobx';
import ajax from "~/utils/ajax";
import BaseStore from '~/stores/BaseStore'

export default class PasswordStore extends BaseStore {
  listApi = '/api/password/get';
  addApi = '/api/password/add';
  updateApi = '/api/password/update';
  deleteApi = '/api/password/delete';
  detailApi = '/api/password/detail';
  
  @action
  async searchData(keywords) {
    this.queryOption = {keywords};
    this.pageIndex = 0;
    await this.getDataList();
  }
}