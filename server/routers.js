/**
 * Created by eatong on 18-2-8.
 */

const Router = require('koa-router');
const {checkArguments, checkLogin, structureData, insertLog} = require('./framework/middleWare');
const {ArgMissError, LogicError} = require('./framework/errors');

const FileApi = require('./apis/FileApi');
const UserApi = require('./apis/UserApi');
//UPDATE_TAG:importApi

const router = new Router();
//define data structure for all API
router.post('/api/*', checkLogin);
router.post('/api/*', structureData);

router.post('/api/user/login', insertLog('login'), checkArguments(['account', 'password']), UserApi.login);
router.post('/api/user/loginByCode', insertLog('login'), checkArguments(['code']), UserApi.loginByCode);
router.post('/api/user/bind', insertLog('bind'), checkArguments(['account' , 'password']), UserApi.bindUser);
router.post('/api/image/upload', FileApi.uploadImage);
//UPDATE_TAG:defineRouter

router.post('/api/*', async ctx => {
  ctx.status = 404;
  ctx.body = 'api not found';
});

module.exports = router;
