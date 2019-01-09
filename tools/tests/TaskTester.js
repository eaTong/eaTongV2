/**
 * Created by eaTong on 2019/1/6 .
 * Description:
 */


const TaskProgressService = require("../../server/services/TaskProgressService");
const TaskService = require("../../server/services/TaskService");

(async () => {
  const task = await TaskProgressService.getTaskProgressByTask({taskId:1});
  console.log(task);
})();
