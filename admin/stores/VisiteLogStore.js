
/**
 * Created by eaTong on 2019-10-31 .
 * Description: auto generated in  2019-10-31
 */

import {observable, action} from 'mobx';
import ajax from "~/utils/ajax";
import BaseStore from '~/stores/BaseStore'

export default class VisiteLogStore extends BaseStore {
  listApi = '/api/visiteLog/get';
  addApi = '/api/visiteLog/add';
  updateApi = '/api/visiteLog/update';
  deleteApi = '/api/visiteLog/delete';
  detailApi = '/api/visiteLog/detail';
  
  @action
  async searchData(keywords) {
    this.queryOption = {keywords};
    this.pageIndex = 0;
    await this.getDataList();
  }
}