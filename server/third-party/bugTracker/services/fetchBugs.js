/**
 * Created by eaTong on 2018/12/10 .
 * Description:
 */
const bugTrackerDB = require('../db');

const Users = bugTrackerDB.import('../models/users.js');
const Bugs = bugTrackerDB.import('../models/bugs.js');
const {Op, fn, col} = require('sequelize');

// Channel.hasMany(Record, {foreignKey: 'channel_id'});
// Record.belongsTo(Channel, {foreignKey: 'channel_id'});

Bugs.belongsTo(Users, {foreignKey: 'bg_assigned_to_user', targetKey: 'us_id'});
Users.hasMany(Bugs, {foreignKey: 'bg_assigned_to_user', targetKey: 'us_id'});

async function getCurrentBusStatus() {
  // const counts = await Bugs.findAll({
  //   group: 'bg_status',
  //   attributes: ['bg_status', [fn('count', 'Bugs.bg_status'), 'statusCount']],
  //   order: [['bg_status']],
  //   where: {bg_project: 12}
  // });

  // const UserCount = await Bugs.findAll({
  //   group: 'bg_status',
  //   attributes: ['bg_status',  [fn('count', 'Users.us_id'), 'statusCount']],
  //   order: [['bg_status']],
  //   where: {bg_project: 12},
  //   include: [Users]
  // });
  // return 1;
  const sql = `with userCount as (SELECT  u.us_id ,b.bg_status , count(*) as count FROM bugs b left join users u on u.us_id = b.bg_assigned_to_user  where bg_project =12   group by u.us_id , b.bg_status)
select * from userCount c left join users u on u.us_id = c.us_id left join statuses s on s.st_id = c.bg_status;`;
  const result = await bugTrackerDB.query('');

  return counts.map(count => count.dataValues.statusCount);
}


getCurrentBusStatus();
