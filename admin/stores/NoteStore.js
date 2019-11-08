
/**
 * Created by eaTong on 2019-11-08 .
 * Description: auto generated in  2019-11-08
 */

import {observable, action} from 'mobx';
import ajax from "~/utils/ajax";
import BaseStore from '~/stores/BaseStore'

export default class NoteStore extends BaseStore {
  listApi = '/api/note/get';
  addApi = '/api/note/add';
  updateApi = '/api/note/update';
  deleteApi = '/api/note/delete';
  detailApi = '/api/note/detail';
  
  @action
  async searchData(keywords) {
    this.queryOption = {keywords};
    this.pageIndex = 0;
    await this.getDataList();
  }
}