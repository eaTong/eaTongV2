/**
 * Created by eaTong on 2018/11/22 .
 * Description:
 */



let config = {
  mysql: {
    user: "eaTong",
    password: "eaTong@eaTong123",
    database: "eaTong",
    host: "127.0.0.1"
  },
  mail: {
    host: 'smtp.exmail.qq.com',
    port: 465,
    auth: {
      user: 'zhouyidong@aikesi-soft.com',
      pass: 'wlf19910102'
    }
  },
  thirdParty: {
    bugTracker: {
      host: 'beta.erpstrong.com',
      port: 4000,
      user: 'btview',
      password: 'GVWcQ0t*QIxoajxo',
      database: 'BTNET'
    }
  }
};

if(process.env.NODEV_ENV === 'production'){
  config = require("./server.config.production")
}


module.exports = config;
