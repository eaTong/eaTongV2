/**
 * Created by eatong on 18-2-8.
 */

const Router = require('koa-router');
const {checkArguments, checkLogin, structureData, insertLog} = require('./framework/middleWare');
const {ArgMissError, LogicError} = require('./framework/errors');

const systemFileApi = require('./apis/systemFileApi');
const userApi = require('./apis/userApi');
const roleApi = require('./apis/roleApi');
const menuApi = require('./apis/menuApi');
//UPDATE_TAG:importApi

const router = new Router();
//define data structure for all API
router.post('/api/*', checkLogin);
router.post('/api/*', structureData);

router.post('/api/user/login', insertLog('login'), checkArguments(['account', 'password']), userApi.login);
router.post('/api/image/upload', systemFileApi.uploadImage);
router.post('/api/file/upload', systemFileApi.uploadFile);
router.post('/api/menu/get', menuApi.getMenus);
router.post('/api/menu/authorised', menuApi.getAuthorisedMenu);

router.post('/api/role/add', insertLog('add'), checkArguments(['name']), roleApi.addRole);
router.post('/api/role/get', roleApi.getRoles);
router.post('/api/role/update', insertLog('update'), checkArguments(['id', 'name']), roleApi.updateRoles);
router.post('/api/role/delete', insertLog('delete'), checkArguments(['ids']), roleApi.deleteRoles);
router.post('/api/role/grant', insertLog('grant'), checkArguments(['roleId', 'menus']), roleApi.grantMenus);

router.post('/api/user/add', insertLog('add'), checkArguments(['account', 'name']), userApi.addUser);
router.post('/api/user/get', userApi.getUsers);
router.post('/api/user/update', insertLog('update'), checkArguments(['id', 'account', 'name']), userApi.updateUsers);
router.post('/api/user/delete', insertLog('delete'), checkArguments(['ids']), userApi.deleteUsers);
router.post('/api/user/logout', insertLog('login'), userApi.logout);
router.post('/api/user/grant', insertLog('grant'), checkArguments(['userId', 'roles']), userApi.grantRole);
router.post('/api/user/changePassword', insertLog('changePassword'), checkArguments(['password', 'originPassword']), userApi.changePassword);

//UPDATE_TAG:defineRouter

router.post('/api/*', async ctx => {
  ctx.status = 404;
  ctx.body = 'api not found';
});

module.exports = router;
