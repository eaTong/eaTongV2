
/**
 * Created by eaTong on 2019-01-18 .
 * Description: auto generated in  2019-01-18
 */

import {observable, action} from 'mobx';
import ajax from "~/utils/ajax";
import BaseStore from '~/stores/BaseStore'

export default class BugStore extends BaseStore {
  listApi = '/api/bug/get';
  addApi = '/api/bug/add';
  updateApi = '/api/bug/update';
  deleteApi = '/api/bug/delete';
  detailApi = '/api/bug/detail';
  
  @action
  async searchData(keywords) {
    this.queryOption = {keywords};
    this.pageIndex = 0;
    await this.getDataList();
  }
}