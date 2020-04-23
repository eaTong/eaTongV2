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
const passwordApi = require('./apis/passwordApi');
const taskApi = require('./apis/taskApi');
const fileApi = require('./apis/fileApi');
const blogApi = require('./apis/blogApi');
const categoryApi = require('./apis/categoryApi');
const visiteLogApi = require('./apis/visiteLogApi');
const noteApi = require('./apis/noteApi');
//UPDATE_TAG:importApi

const router = new Router();
//define data structure for all API
router.all('/api/*', checkLogin);
router.all('/api/*', structureData);

router.all('/api/pub/blog/get', blogApi.getBlogs);
router.all('/api/pub/category/get', categoryApi.getCategoryies);
router.all('/api/pub/blog/detail', checkArguments(['id']), blogApi.getBlogDetail);
router.all('/api/pub/category/detail', checkArguments(['id']), categoryApi.getCategoryDetail);
router.all('/api/pub/note/get', noteApi.getNotes);
router.post('/api/pub/blog/reply', checkArguments(['blogId']), blogApi.replyBlog);


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


router.post('/api/password/add', insertLog('add'), checkArguments(['name']), passwordApi.addPassword);
router.post('/api/password/get', passwordApi.getPasswords);
router.post('/api/password/update', insertLog('update'), checkArguments(['id', 'name']), passwordApi.updatePasswords);
router.post('/api/password/delete', insertLog('delete'), checkArguments(['ids']), passwordApi.deletePasswords);
router.post('/api/password/detail', checkArguments(['id']), passwordApi.getPasswordDetail);

router.post('/api/task/add', insertLog('add'), checkArguments(['name']), taskApi.addTask);
router.post('/api/task/get', taskApi.getTasks);
router.post('/api/task/update', insertLog('update'), checkArguments(['id', 'name']), taskApi.updateTasks);
router.post('/api/task/delete', insertLog('delete'), checkArguments(['ids']), taskApi.deleteTasks);
router.post('/api/task/detail', checkArguments(['id']), taskApi.getTaskDetail);

router.post('/api/file/add', insertLog('add'), checkArguments(['name']), fileApi.addFile);
router.post('/api/file/get', fileApi.getFiles);
router.post('/api/file/update', insertLog('update'), checkArguments(['id', 'name']), fileApi.updateFiles);
router.post('/api/file/delete', insertLog('delete'), checkArguments(['ids']), fileApi.deleteFiles);
router.post('/api/file/detail', checkArguments(['id']), fileApi.getFileDetail);

router.post('/api/blog/add', insertLog('add'), checkArguments(['title', 'content']), blogApi.addBlog);
router.post('/api/blog/get', blogApi.getBlogs);
router.post('/api/blog/update', insertLog('update'), checkArguments(['id', 'title', 'content']), blogApi.updateBlogs);
router.post('/api/blog/delete', insertLog('delete'), checkArguments(['ids']), blogApi.deleteBlogs);
router.post('/api/blog/detail', checkArguments(['id']), blogApi.getBlogDetail);

router.post('/api/category/add', insertLog('add'), checkArguments(['name']), categoryApi.addCategory);
router.post('/api/category/get', categoryApi.getCategoryies);
router.post('/api/category/update', insertLog('update'), checkArguments(['id', 'name']), categoryApi.updateCategoryies);
router.post('/api/category/delete', insertLog('delete'), checkArguments(['ids']), categoryApi.deleteCategoryies);
router.post('/api/category/detail', checkArguments(['id']), categoryApi.getCategoryDetail);

router.post('/api/visiteLog/get', visiteLogApi.getVisiteLogs);
router.post('/api/visiteLog/delete', insertLog('delete'), checkArguments(['ids']), visiteLogApi.deleteVisiteLogs);

router.post('/api/note/add', insertLog('add'), checkArguments(['content']), noteApi.addNote);
router.post('/api/note/get', noteApi.getNotes);
router.post('/api/note/update', insertLog('update'), checkArguments(['id', 'content']), noteApi.updateNotes);
router.post('/api/note/delete', insertLog('delete'), checkArguments(['ids']), noteApi.deleteNotes);
router.post('/api/note/detail',  checkArguments(['id']), noteApi.getNoteDetail);
//UPDATE_TAG:defineRouter

router.all('/api/*', async ctx => {
  ctx.status = 404;
  ctx.body = 'api not found';
});

module.exports = router;
