import axios from 'axios';
import store from '../stores';
import {notify} from '../components';

export default function ajax(config = {}) {
  const {url, data, ctx, headers} = config;

  config.method = config.method || 'post';

  return new Promise((async (resolve, reject) => {
    //if ctx.req is not null or undefined means this request is called from server-side,
    if (ctx && ctx.req) {
      const requestData = {...data, __server: true};
      try {
        const host = ctx.req.headers.host;
        const result = await axios({
          url: 'http://' + host + url,
          data: requestData,
          params: config.method === 'get' ? requestData : {},
          headers: ctx.req.headers
        });
        // const result = await axios.post('http://' + host + url, {...data, __server: true}, {headers: ctx.req.headers});
        if (!result.data.success) {
          ctx.res.statusCode = 200;
          ctx.res.end(result.data.message);
        }
        resolve(result.data.data);

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
        const requestData = {...data, pageUrl: window.location.pathname + window.location.search};
        const result = await axios({
          url,
          headers,
          data: requestData,
          params: config.method === 'get' ? requestData : {},
        });
        if (!result.data.success) {
          notify.error({content: result.data.message});
          reject(result.data);
        }
        store.app.cancelLoading();
        resolve(result.data.data);
      } catch (ex) {
        console.log(ex);
        store.app.cancelLoading();
        notify.error({content: ex.message});
        reject(result.data.message);
      }
    }
  }));


};
