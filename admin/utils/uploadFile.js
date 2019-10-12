/**
 * Created by eatong on 17-6-16.
 */

const DEFAULT_OPTIONS = {
  url: '/api/image/upload'
};

export default class UploadFile {
  constructor(options) {
    this.opts = Object.assign({}, DEFAULT_OPTIONS, options);
  }

  upload(file, callback) {
    const form = new FormData();
    this.files = new Array(file);
    form.append('file', file);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', this.opts.url, true);

    xhr.upload.onloadstart = (event) => this.onLoadStart(event);
    xhr.upload.onprogress = (event) => this.onProgress(event);
    xhr.upload.onload = (event) => this.onLoad(event);
    xhr.upload.onerror = (event) => this.onError(event);
    xhr.upload.onabort = (event) => this.onAbort(event);
    xhr.upload.ontimeout = (event) => this.onTimeout(event);
    xhr.upload.onloadend = (event) => this.onLoadEnd(event);
    // 发送表单数据
    xhr.onload = ({currentTarget}) => {
      let data = {};
      try {
        data = JSON.parse(currentTarget.responseText);
      } catch (e) {
        data = {data: ''}
      }
      callback && callback(data);
    };
    xhr.send(form)
  }

  onLoadStart(event) {
    console.log('start:', event);
  }

  onProgress(event) {
  }

  onLoad(event) {
    console.log('onLoad:', event);
  }

  onError(event) {
    console.log('onError:', event);
  }

  onAbort(event) {
    console.log('onAbort:', event);
  }

  onTimeout(event) {
    console.log('onTimeout:', event);
  }

  onLoadEnd(event) {
    console.log('onLoadEnd:', event);
  }

  getBase64(file, callback) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      callback && callback(reader.result);
    };
  }
}
