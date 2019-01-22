/**
 * Created by eaTong on 2018/6/16 .
 * Description:
 */
import {observable, action} from 'mobx';
import ajax from "~/utils/ajax";
import {REFRESH_TAG} from "~/utils/enums";


export default class AppStore {
  authMapping = {};
  @observable ajaxCount = {};
  @observable loginUser = {};
  @observable menus = [];
  @observable activeKey = '/admin/index';
  @observable lastKey = '';
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
    this.initialAuthMapping(data || []);
  }

  @action
  initialAuthMapping(data) {
    for (const item of data) {
      if ((item.children || []).length > 0) {
        this.authMapping[item.path] = item.children.map(child => child.path.replace(/.*\//g, ''));
        this.initialAuthMapping(item.children);
      } else {
        this.authMapping[item.path] = true;
      }
    }
  }

  @action
  getCachedUser() {
    this.loginUser = JSON.parse(window.sessionStorage.getItem('loginUser') || '{}');
  }

  @action
  onChangeTab(path) {
    let keyIndex;
    let newList = this.tabList;
    for (let i in newList) {
      if (path === newList[i].path) {
        keyIndex = ~~i;
        break;
      }
    }
    //如果tabname后面带了*，则代表页面需要刷新，每次页面
    if (/\s\*$/.test(newList[keyIndex].name)) {
      path = path + REFRESH_TAG;
      newList[keyIndex].name = newList[keyIndex].name.slice(0, -2);
      newList[keyIndex].path = path;
    }
    this.lastKey = this.activeKey;
    this.activeKey = path;
    this.tabList = [...newList];
  }

  @action
  addTab(path, name, optionalData) {
    let valueIndex = -1;
    for (let i in this.tabList) {
      if (this.tabList[i].path.split(REFRESH_TAG)[0] === path) {
        valueIndex = i;
        break;
      }
    }
    if (valueIndex !== -1) {
      //如果需要刷新，则强制刷新
      const key = this.tabList[valueIndex];
      if (/\s\*$/.test(key.name)) {
        const tabList = this.tabList;
        tabList[valueIndex].path = tabList[valueIndex].path + REFRESH_TAG;
        tabList[valueIndex].name = tabList[valueIndex].name.slice(0, -2);
        this.activeKey = tabList[valueIndex].path;
        this.lastKey = this.activeKey;
        this.tabList = [...tabList];
      } else {
        this.activeKey = this.tabList[valueIndex].path;
        this.lastKey = this.activeKey;
      }
    } else {
      if (name) {
        this.lastKey = this.activeKey;
        this.tabList = [...this.tabList, {path: path, name: name, optionalData}];
        this.activeKey = path;
      } else {
        console.error('name参数未传值，将不打开标签');
      }
    }
  }

  refreshTab(key, index) {
    key = {...key, path: key.path + REFRESH_TAG};
    let newList = [...this.tabList];
    newList[index] = key;
    this.activeKey = key.path;
    this.tabList = newList;
  }

  closeTab(key, event) {
    event && event.preventDefault();
    event && event.stopPropagation();
    //TODO
    let newList = [...this.tabList];
    let index, newIndex, newKey;

    if (key === this.activeKey) {
      for (let i = 0; i < newList.length; i++) {
        if (newList[i].path.split(REFRESH_TAG)[0] === key) {
          index = i;
        }
        if (newList[i].path === this.lastKey) {
          newIndex = i;
          newKey = newList[i];
        }
      }
    } else {
      for (let i = 0; i < newList.length; i++) {
        if (newList[i].path.split(REFRESH_TAG)[0] === key) {
          index = i;
        }
        if (newList[i].path === this.activeKey) {
          newIndex = i;
          newKey = newList[i];
        }
      }
    }
    if (!newIndex) {
      newIndex = newList.length - 2;
      newKey = newList[newIndex];
    }
    if (index >= 0) {
      if (/\s\*/.test(newList[newIndex].name)) {

        newList[newIndex].path = newList[newIndex].path + REFRESH_TAG;
        newList[newIndex].name = newList[newIndex].name.slice(0, -2);
      }
      newList.splice(index, 1);

      this.activeKey = newKey.path;
      this.tabList = newList;
    }
  }
}
