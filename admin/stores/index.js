/**
 * Created by eaTong on 2018/6/16 .
 * Description:
 */
import AppStore from './AppStore';
import TaskStore from './TaskStore';
import UserStore from "~/stores/UserStore";
import RoleStore from "~/stores/RoleStore";
import PasswordStore from './PasswordStore';
import FileStore from './FileStore';
//UPDATE_TAG:importStore

export default {
  app: new AppStore(),
  task: new TaskStore(),
  user: new UserStore(),
  role: new RoleStore(),
  password: new PasswordStore(),
  file: new FileStore(),
//UPDATE_TAG:registerStore
}
