/**
 * Created by 7wingsfish on 2016/8/2.
 */

Date.prototype.format = function (format) {
  format = format || 'YYYY-MM-DD';
  console.log(this);
  const date = {
    "M+": this.getMonth() + 1,
    "D+": this.getDate(),
    "H+": this.getHours(),
    "m+": this.getMinutes(),
    "S+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "s+": this.getMilliseconds()
  };
  if (/(Y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (let k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
};
