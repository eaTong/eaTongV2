/**
 * created by eaTong at 2019/10/12
 */
import {observable, action, computed, toJS} from 'mobx';
import ajax from "../util/ajax";

export default class App {
  @observable blog = {};
}
