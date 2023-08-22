const {Op} = require('sequelize');
const sequelize = require('../framework/database');
const moment = require('moment');
const axios = require('axios');

module.exports = {
  sendMorningCoffee:async ()=>{
    const data = {
      "msgtype": "text",
      "text": {
        "content": "每天一问：正蕊今天来不来公司？",
        // "mentioned_list":["wangqing","@all"],
        // "mentioned_mobile_list":["13800001111","@all"]
      }
    };
    await axios.post('https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=532fc223-f16f-4e37-8294-7a5f2be3d0d4',data)
  }
}

