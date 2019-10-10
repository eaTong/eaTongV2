
/**
 * Created by eaTong on 2019-10-10 .
 * Description: auto generated in  2019-10-10
 */

import {observable, action} from 'mobx';
import ajax from "~/utils/ajax";
import BaseStore from '~/stores/BaseStore'

export default class BlogStore extends BaseStore {
  listApi = '/api/blog/get';
  addApi = '/api/blog/add';
  updateApi = '/api/blog/update';
  deleteApi = '/api/blog/delete';
  detailApi = '/api/blog/detail';
  
  @action
  async searchData(keywords) {
    this.queryOption = {keywords};
    this.pageIndex = 0;
    await this.getDataList();
  }
}