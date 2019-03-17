/**
 * Created by eaTong on 2019/1/6 .
 * Description:
 */
const moment = require('moment');

const bugService = require("../../server/services/bugService");

(async () => {
  // await
  const date = moment('2019-01-01');
  // console.log(date.get('time'), moment().get('time'));
  await staticsBug(date);

})();


async function staticsBug(time) {
  if (time.isBefore(moment())) {
    await bugService.staticsBugsByUser(time.format('YYYY-MM-DD'));
    time.set('date', time.get('date' )+ 1);
    await staticsBug(time)
  }
}
