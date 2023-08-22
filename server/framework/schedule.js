/**
 * Created by eaTong on 2018/7/4 .
 * Description:
 */
const schedule = require('node-schedule');
const passwordService = require("../services/passwordService");
const {sendMorningCoffee} = require("../services/sendNotify");

// auto send statics info every night in 20:00:00
schedule.scheduleJob('42 59 23 * * *', async function () {
  await passwordService.checkNearly();
});
schedule.scheduleJob('00 30 08 * * *', async function () {
  await sendMorningCoffee();
});
