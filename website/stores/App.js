import {observable, action, computed, toJS} from 'mobx';

export default class App {
  @observable loadingCount = 0;
  @observable loadingUrl = {};

  @action
  loading(key) {
    if (this.loadingUrl[key]) {
      this.loadingUrl[key] = this.loadingUrl[key] + 1;
    } else {
      this.loadingUrl[key] = 1;
    }
    this.loadingCount++;
  }

  @action
  cancelLoading(key) {
    this.loadingCount = this.loadingCount > 0 ? 0 : this.loadingCount--;
    this.loadingUrl[key] = this.loadingUrl[key] - 1;
  }
}
