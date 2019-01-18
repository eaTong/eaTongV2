/**
 * Created by eaTong on 2018/12/10 .
 * Description:
 */
const bugTrackerDB = require('../db');

async function getCurrentBugStatus(time) {

  const sql = `
with userCount as (SELECT u.us_id,b.bg_status, count(*) as count
                   FROM bugs b
                          left join users u on u.us_id = b.bg_assigned_to_user
                   where bg_project = 12
                     and u.us_id is not null
                     and (
                       b.bg_status not in (2,5, 6, 7, 8, 9)
                       or (b.bg_status = 5 and b.bg_last_updated_date > '${time}')
                     )
                   group by u.us_id, b.bg_status)
select u.us_username as name,c.count as count, s.st_id as status
from userCount c
       left join users u on u.us_id = c.us_id
       left join statuses s on s.st_id = c.bg_status;

`;
  const result = await bugTrackerDB.query(sql, {type: bugTrackerDB.QueryTypes.SELECT});

  if (result && result.length > 0) {
    const countMapping = {};
    result.forEach(item => {
      if (!countMapping[item.name]) {
        countMapping[item.name] = {
          new: 0,
          test: 0,
          complete: 0,
          return: 0,
          hang: 0
        };
      }

      switch (item.status) {
        case 0:
          countMapping[item.name].hang = item.count;
          break;
        case 1:
          countMapping[item.name].new = item.count;
          break;
        case 5:
          countMapping[item.name].complete = item.count;
          break;
        case 3:
          countMapping[item.name].test = item.count;
          break;
        case 10:
          countMapping[item.name].return = item.count;
          break;
      }

    });
    const statics = [];
    for (let key in countMapping) {
      statics.push({...countMapping[key], name: key})
    }
    return statics;
  }
  return []
}

module.exports = getCurrentBugStatus;
