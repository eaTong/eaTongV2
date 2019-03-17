/**
 * Created by eaTong on 2018/12/10 .
 * Description:
 */
const bugTrackerDB = require('../db');
const moment = require('moment');

async function getBugsByName(time) {
  const nextDay = moment(time);
  nextDay.set('date', nextDay.get('date') + 1);
  const sql = `
select
	count(*) as count,
	bg_assigned_to_user
from
	bugs
where
	bg_project = 12
	and bg_status = 5
	and bg_last_updated_date between '${time}' and '${nextDay.format('YYYY-MM-DD')}'
group by
	bg_assigned_to_user ;

`;
  return await bugTrackerDB.query(sql, {type: bugTrackerDB.QueryTypes.SELECT});

}

module.exports = getBugsByName;

