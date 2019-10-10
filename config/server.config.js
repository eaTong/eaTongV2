/**
 * Created by eaTong on 2018/11/22 .
 * Description:
 */

const fs = require('fs-extra');
const path = require('path');

let config = {
  mysql: {
    user: "user",
    password: "123456",
    database: "eaTong",
    host: "127.0.0.1"
  },
  mail: {
    host: 'smtp.exmail.qq.com',
    port: 465,
    auth: {
      user: 'zhouyidong@aikesi-soft.com',
      pass: '123456'
    }
  },
  oss: {
    region: 'oss-cn-beijing',
    accessKeyId: '123',
    accessKeySecret: '123',
    bucket: 'eatong'
  },
};

if (fs.existsSync(path.resolve(__dirname, 'server.config.production.js'))) {
  config = require("./server.config.production")
}


module.exports = config;
