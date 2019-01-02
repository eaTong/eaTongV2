/**
 * Created by eaTong on 2018/6/16 .
 * Description:
 */
import {observable, action} from 'mobx';
import ajax from "~/utils/ajax";


export default class AppStore {
  @observable ajaxCount = {};
  @observable loginUser = {};
  @observable menus = [];
  @observable tabList = [
    {path: '/admin/index', name: '首页', optionalData: {}}
  ];

  @action
  async login(values) {
    const data = await ajax({data: values, url: '/api/user/login'});
    this.loginUser = data;
    window.sessionStorage.setItem('loginUser', JSON.stringify(data));
    return data;
  }

  @action initialLoginUser() {
    this.loginUser = JSON.parse(window.sessionStorage.getItem('loginUser') || '{}');
  }

  @action
  ajaxStart(url) {
    const ajaxCount = {...this.ajaxCount};
    ajaxCount[url] = ajaxCount[url] ? ajaxCount[url] + 1 : 1;
    this.ajaxCount = ajaxCount;
  }

  @action
  ajaxEnd(url) {
    const ajaxCount = {...this.ajaxCount};
    ajaxCount[url] = ajaxCount[url] - 1;
    this.ajaxCount = ajaxCount;
  }

  @action
  async getAuthorisedMenu() {
    const data = await ajax({url: '/api/menu/authorised'});
    this.menus = data || [];
  }

  @action
  getCachedUser() {
    this.loginUser = JSON.parse(window.sessionStorage.getItem('loginUser') || '{}');
  }
}
