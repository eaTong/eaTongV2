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
import BlogStore from './BlogStore';
import CategoryStore from './CategoryStore';
//UPDATE_TAG:importStore

export default {
  app: new AppStore(),
  task: new TaskStore(),
  user: new UserStore(),
  role: new RoleStore(),
  password: new PasswordStore(),
  file: new FileStore(),
blog: new BlogStore(),
category: new CategoryStore(),
//UPDATE_TAG:registerStore
}
