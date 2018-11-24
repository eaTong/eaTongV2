/**
 * Created by eatong on 18-2-11.
 */
const User = require('../server/models/User');
const OperationLog = require('../server/models/OperationLog');
//UPDATE_TAG:importModel

(async () => {
  await initialDatabaseStructure();
  // await initZoomConfig();
  process.exit();
})();


async function initialDatabaseStructure() {

  await User.sync({alter: true});
  await OperationLog.sync({alter: true});
//UPDATE_TAG:asyncModel
}
