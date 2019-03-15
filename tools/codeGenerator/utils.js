/**
 * Created by eaTong on 2019/1/6 .
 * Description:
 */
const fs = require('fs-extra');
const moment = require('moment');

const currentDate = moment().format('YYYY-MM-DD');

const description = `
/**
 * Created by eaTong on ${currentDate} .
 * Description: auto generated in  ${currentDate}
 */
`;



module.exports.upperFirstLetter = function (word) {
  return word.replace(/\w/, (a) => a.toUpperCase())
};

/**
 * 自动生成文件模板
 * @param filePath 文件地址
 * @param string 文件内容
 * @returns {Promise}
 */

module.exports.writeFile = function (filePath, string) {
  return new Promise((resolve, reject) => {
    fs.ensureFileSync(filePath)
    fs.writeFile(filePath, description + string, (err) => {
      if (err) {
        console.log(err);
        reject('aaaa');
      }
      console.log(`自动生成文件：${filePath}`);
      resolve();
    });
  });
};


module.exports.updateFile = function (filePath, tag, string) {
  const str = fs.readFileSync(filePath).toString().replace(new RegExp(`\/\/UPDATE_TAG:${tag}`, 'g'), (str) => `${string}\n${str}`);

  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, str, (err) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      console.log(`自动更新文件：${filePath} , tag:UPDATE_TAG:${tag}`);
      resolve();
    });
  });
};
