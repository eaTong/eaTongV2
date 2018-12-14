/**
 * Created by eaTong on 2018/6/30 .
 * Description:
 */
const fs = require('fs-extra');
const path = require('path');
const {v4} = require('uuid');
const BaseApi = require('../framework/BaseApi');


class FileApi extends BaseApi {
  static async uploadImage(ctx) {
    const file = ctx.request.files.file;
    const reader = fs.createReadStream(file.path);
    const fileName = v4() + file.name.slice(file.name.lastIndexOf('.'), file.name.length);
    const uploadPath = 'assets/upload/img';
    await fs.ensureDir(uploadPath);
    const filePath = path.resolve(uploadPath, fileName);
    const stream = fs.createWriteStream(filePath);
    reader.pipe(stream);
    return `/upload/img/${fileName}`;
  }

  static async uploadFile(ctx) {
    const file = ctx.request.files.file;
    const reader = fs.createReadStream(file.path);
    const fileName = v4() + file.name.slice(file.name.lastIndexOf('.'), file.name.length);
    const uploadPath = 'assets/upload/file';
    await fs.ensureDir(uploadPath);
    const filePath = path.resolve(uploadPath, fileName);
    const stream = fs.createWriteStream(filePath);
    reader.pipe(stream);
    return `/upload/file/${fileName}`;
  }
}

module.exports = FileApi;
