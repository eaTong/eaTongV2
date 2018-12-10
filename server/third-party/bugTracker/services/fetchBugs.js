/**
 * Created by eaTong on 2018/12/10 .
 * Description:
 */
const bugTrackerDB = require('../db');
const User = bugTrackerDB.import('../models/users.js');

async function fetchBugs() {
  const users = await User.findAll();
  console.log(users);
}


fetchBugs();
