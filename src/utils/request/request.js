import axios from 'axios';
import handleError from '@/utils/handleError';
import { GlobalLoading } from '@/native-components/LoadingTip';
import { REQUEST_TIMEOUT } from '@/config';
// import getAuth from '@/utils/auth';
import { Toast } from 'vant';
import qs from 'qs';

// 创建一个基础服务
const service = axios.create({
  // baseURL: process.env.NODE_ENV === 'production' ? PROD_BASE_API : DEV_BASE_API,
  timeout: REQUEST_TIMEOUT,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
});
// 配置请求服务拦截器
service.interceptors.request.use((config) => {
  try {
    const date = new Date();
    const randomNum = Math.floor(Math.random() * 100);
    const id = date.getTime() + randomNum.toString();
    config.id = id;
    GlobalLoading.show(id);
    // const skipAuth = config.params && config.params.skipAuth ? config.params.skipAuth : false;
    // const reg = new RegExp(`(^|&)skipAuth=([^&]*)(&|$)`)
    // const r = data.match(reg)
    // if (r != null) skipAuth = r[2]

    // if (NEED_AUTH && skipAuth !== true) {
    //   const sessionId = localStorage.getItem(STORAGE_KEY_SESSION);
    //   if (!sessionId) {
    //     // getAuth();
    //     config.errorType = 'auth';
    //     const rejectObj = {
    //       config,
    //       errorMsg: '未能获取sessionId',
    //     };
    //     return Promise.reject(rejectObj);
    //   }
    // config.headers[AUTH_HEADER_NAME] = sessionId;
    // }
    // config.isWechat = isWechat ? 'wechat' : 'APP';
  } catch (err) {
    console.warn(err);
  }

  return config;
}, (error) => {
  const { id } = error.config;
  GlobalLoading.hide(id);
  return handleError({
    errorType: 'net',
    errorMsg: error,
  });
});

// 配置返回拦截器，预处理接口返回数据
service.interceptors.response.use((response) => {
  const { id } = response.config;
  GlobalLoading.hide(id);
  const res = response.data;
  // if (res.status !== 200) { // 处理请求状态码，当返回码不为 200 时判断错误类型
  //     // TODO 处理请求状态码404、502、304等
  //     console.warn('请求状态码为' + res.status)
  // }
  if (res.resultCode
    && res.resultCode === -1
  ) { // 处理接口返回码，当返回码不为 1 时判断错误类型
    Toast(res.errorMsg);
    return handleError({
      errorType: 'server',
      errorCode: res.code,
      errorMsg: res.errorMsg,
    });
  }
  return Promise.resolve(res.body || res);
}, (error) => {
  if (error && error.response) {
    switch (error.response.status) {
      case 400: error.errorMsg = '请求错误(400)'; break;
      case 401: error.errorMsg = '未授权，请重新登录(401)'; break;
      case 403: error.errorMsg = '拒绝访问(403)'; break;
      case 404: error.errorMsg = '请求出错(404)'; break;
      case 408: error.errorMsg = '请求超时(408)'; break;
      case 500: error.errorMsg = '服务器错误(500)'; break;
      case 501: error.errorMsg = '服务未实现(501)'; break;
      case 502: error.errorMsg = '网络错误(502)'; break;
      case 503: error.errorMsg = '服务不可用(503)'; break;
      case 504: error.errorMsg = '网络超时(504)'; break;
      case 505: error.errorMsg = 'HTTP版本不受支持(505)'; break;
      default: error.errorMsg = `连接出错(${error.response.status})!`;
    }
  } else if (error.config && error.config.errorType !== 'auth' && !error.response) {
    // const checkResult = validateAuth();
    // if (checkResult.isSuccess && !checkResult.isValidate) { // 接口调用成功，并且判定session过期
    //   error.config.errorType = 'auth';
    //   error.errorMsg = '登录已失效!';
    //   // getAuth();
    // } else {
    //   error.config.errorType = 'net';
    //   error.errorMsg = '服务器无法连接!';
    // }
  } else {
    console.warn('无法获取config配置 ---- request.js  line  99');
  }

  const { id } = error.config;
  GlobalLoading.hide(id);

  return handleError({
    errorType: error.config.errorType || 'net',
    errorMsg: error,
  });
});

export default (config) => {
  if (config.method === 'post') {
    return service[config.method](config.url, qs.stringify(config.params))
      .then(res => Promise.resolve(res));
  }
  return service[config.method](config.url, { params: config.params })
    .then(res => Promise.resolve(res));
};
// export default config => service(config);
