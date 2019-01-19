/**
 * Created by eaTong on 2019/1/6 .
 * Description:
 */


const BugService = require("../../server/services/BugService");

(async () => {
  await BugService.staticsBugs();
})();
