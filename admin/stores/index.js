/**
 * Created by eaTong on 2018/6/16 .
 * Description:
 */
import AppStore from './AppStore';
import TaskStore from './TaskStore';
import UserStore from "~/stores/UserStore";
import RoleStore from "~/stores/RoleStore";
//UPDATE_TAG:importStore

export default {
  app: new AppStore(),
  task: new TaskStore(),
  user: new UserStore(),
  role: new RoleStore(),
//UPDATE_TAG:registerStore
}
