/**
 * Created by eaTong on 2019/1/6 .
 * Description:
 */

const readline = require('readline');
const path = require('path');
const minimist = require('minimist');
const {updateFile, upperFirstLetter, writeFile} = require("./utils");
const {
  getAddPageRoute, getApi, getAsyncMenu, getAsyncModel, getDefineRouter, getImportApi,
  getImportModel, getImportPage, getImportStore, getFormModal, getModel, getPage, getRegisterStore, getService, getStore
} = require("./templates");

const basePath = path.resolve(process.cwd(), '..');
const modelPath = path.resolve(basePath, 'server', 'models');
const apiPath = path.resolve(basePath, 'server', 'apis');
const servicePath = path.resolve(basePath, 'server', 'services');
const routerPath = path.resolve(basePath, 'server', 'routers.js');
const initDbPath = path.resolve(basePath, 'bin', 'initDB.js');
const storePath = path.resolve(basePath, 'admin', 'stores');
const storeIndexPath = path.resolve(basePath, 'admin', 'stores', 'index.js');
const appPath = path.resolve(basePath, 'admin', 'componentsMapping.js');
const frontPath = path.resolve(basePath, 'admin', 'pages');

const readlineInstance = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

readlineInstance.question('What\'s the form name ?', async form => {
  const args = minimist(process.argv.slice(2));

  const specifyCode = args.hasOwnProperty('f') || args.hasOwnProperty('b');
  const moduleName = args.m;

  if (args.b || !specifyCode) {

// generate code of backend
  await writeFile(path.resolve(modelPath, `${upperFirstLetter(form)}.js`), getModel(form));
  await writeFile(path.resolve(apiPath, `${form}Api.js`), getApi(form));
  await writeFile(path.resolve(servicePath, `${form}Service.js`), getService(form));
  await updateFile(routerPath, 'importApi', getImportApi(form));
  await updateFile(routerPath, 'defineRouter', getDefineRouter(form));
  await updateFile(initDbPath, 'importModel', getImportModel(form));
  await updateFile(initDbPath, 'asyncModel', getAsyncModel(form));
  await updateFile(initDbPath, 'asyncMenu', getAsyncMenu(form));

  }
  if (args.f || !specifyCode) {
// generate code of frontend
  await writeFile(path.resolve(frontPath, form, `${upperFirstLetter(form)}FormModal.js`), getFormModal(form));
  await writeFile(path.resolve(frontPath, form, `${upperFirstLetter(form)}Page.js`), getPage(form));
  await writeFile(path.resolve(storePath, `${upperFirstLetter(form)}Store.js`), getStore(form));
  await updateFile(storeIndexPath, 'importStore', getImportStore(form));
  await updateFile(storeIndexPath, 'registerStore', getRegisterStore(form));
  await updateFile(appPath, 'importPage', getImportPage(form));
  await updateFile(appPath, 'addPageRoute', getAddPageRoute(form));
  readlineInstance.close();

  }
  process.exit();
});

