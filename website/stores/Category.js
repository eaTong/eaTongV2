import {observable, action, computed, toJS} from 'mobx';

export default class Category {
  @observable name;
  @observable type;
  @observable description;
  @observable notes = [];
  @observable blogs = [];

}
