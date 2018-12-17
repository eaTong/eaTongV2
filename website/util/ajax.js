import axios from 'axios';
import store from '../stores';
import {notify} from '../components';

export default async function ajax(config) {
  const {url, data, ctx, headers} = config;
  //if ctx.req is not null or undefined means this request is called from server-side,
  if (ctx && ctx.req) {
    try {
      const host = ctx.req.headers.host;
      const result = await axios.post('http://' + host + url, {...data, __server: true}, {headers: ctx.req.headers});
      if (!result.data.success) {
        ctx.res.statusCode = 200;
        ctx.res.end(result.data.message);
      }
      return result.data;

    } catch (ex) {
      const statusCode = ex.response.status;
      ctx.res.statusCode = ex.response.status;
      if (statusCode === 401) {
        ctx.res.writeHead(302, {'Location': '/login'});
        res.end();
      }
      ctx.res.end(ex.response.data.message);
    }
  } else {
    let result;
    store.app.loading();
    try {
      const formData = headers ? data : {...data, pageUrl: window.location.pathname + window.location.search};
      result = await axios.post(url, formData, {headers: headers});
      if (!result.data.success) {
        notify.error({content: result.data.message});
        throw Error(result.data.message);
      }
      store.app.cancelLoading();
      return result.data;
    } catch (ex) {
      store.app.cancelLoading();
      notify.error({content: ex.message});
      return {success: false, data: {}, message: ex.message}
    }
  }
};
