/**
 * Created by eatong on 18-2-11.
 */
const User = require('../server/models/User');
const OperationLog = require('../server/models/OperationLog');
const Menu = require('../server/models/Menu');
const Role = require('../server/models/Role');
const RoleMenu = require('../server/models/RoleMenu');
const UserRole = require('../server/models/UserRole');
const Task = require('../server/models/Task');
const Password = require('../server/models/Password');
//UPDATE_TAG:importModel

(async () => {
  await initialDatabaseStructure();
  await initialMenu();
  await initRole();
  // await initZoomConfig();
  process.exit();
})();


async function initialDatabaseStructure() {

  await User.sync({alter: true});
  await OperationLog.sync({alter: true});
  await Menu.sync({alter: true});
  await Role.sync({alter: true});
  await RoleMenu.sync({alter: true});
  await UserRole.sync({alter: true});
  await Task.sync({alter: true});
  await Password.sync({alter: true});
//UPDATE_TAG:asyncModel
}

async function initialMenu() {
  const menuList = [
    {name: '用户管理', icon: 'user', path: '/admin/user', enable: true},
    {name: '角色管理', icon: 'team', path: '/admin/role', enable: true},
    {name: '任务管理', icon: 'team', path: '/admin/task', enable: true},
    {name: 'password', icon: 'file', path: '/admin/password', enable: true},
//UPDATE_TAG:asyncMenu
  ];
  await Menu.bulkCreate(menuList, {updateOnDuplicate: ['path', 'name', 'icon', 'enable']});
}

async function initRole() {
  const role = await Role.findAll();
  if (role.length === 0) {
    const adminRole = await Role.create({name: '系统管理员', enable: true});
    const menus = await Menu.findAll();
    adminRole.setMenus(menus);
    await adminRole.save();
  }
}
