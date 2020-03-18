/**
 * Created by eaTong on 2019/6/1 .
 * Description:
 */

const {addUser} = require("../../server/services/userService");
(async ()=>{
  addUser({name:'eaTong',account:'eaTong',password:'eaTong123'});
})();
