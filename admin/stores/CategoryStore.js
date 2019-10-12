
/**
 * Created by eaTong on 2019-10-12 .
 * Description: auto generated in  2019-10-12
 */

import {observable, action} from 'mobx';
import ajax from "~/utils/ajax";
import BaseStore from '~/stores/BaseStore'

export default class CategoryStore extends BaseStore {
  listApi = '/api/category/get';
  addApi = '/api/category/add';
  updateApi = '/api/category/update';
  deleteApi = '/api/category/delete';
  detailApi = '/api/category/detail';
  
  @action
  async searchData(keywords) {
    this.queryOption = {keywords};
    this.pageIndex = 0;
    await this.getDataList();
  }
}