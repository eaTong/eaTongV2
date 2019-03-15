
/**
 * Created by eaTong on 2019-03-15 .
 * Description: auto generated in  2019-03-15
 */

import {observable, action} from 'mobx';
import ajax from "~/utils/ajax";
import BaseStore from '~/stores/BaseStore'

export default class FileStore extends BaseStore {
  listApi = '/api/file/get';
  addApi = '/api/file/add';
  updateApi = '/api/file/update';
  deleteApi = '/api/file/delete';
  detailApi = '/api/file/detail';
  
  @action
  async searchData(keywords) {
    this.queryOption = {keywords};
    this.pageIndex = 0;
    await this.getDataList();
  }
}