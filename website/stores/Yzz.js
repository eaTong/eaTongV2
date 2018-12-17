/**
 * Created by eatong on 18-12-17.
 */

import {observable, action, computed, toJS} from 'mobx';
import ajax from "../util/ajax";

export default class YzzStore {
  @observable currentUser = {};

  getCachedUser() {

  }

  @action
  async login() {
    console.log(123);
    await ajax({url: '/yzz/api/um/login', method: 'post', data: {account: '18288756143', password: 'a12345'}});
    console.log(234);
  }


}
