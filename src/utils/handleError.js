import { tipList } from '@/config';
import { Toast } from 'vant';

const NET_ERROR_MSG = '网络请求超时';
const AUTH_ERROR_MSG = '接口鉴权失败';

/**
 * 处理接口请求报错
 * 1.收集错误信息
 * 2.给出统一用户反馈交互
 *
 * @param {string} error.errorType    [必填，错误种类 net：网络错误；server：服务器处理错误, auth: sessionId获取失败或过期]
 * @param {string} error.errorMsg     [可选，在网络错误类型中直接抛出axios错误信息]
 * @param {string} error.errorCode    [可选，在服务器错误类型中给出服务器错误返回值]
 */
const handleError = (error) => {
  console.warn('报错');
  console.log(error);
  // const errorType = error.errorType;
  if (error.errorType === 'net') {
    Toast(NET_ERROR_MSG);
    return Promise.reject(NET_ERROR_MSG);
  } else if (error.errorType === 'auth') {
    Toast(AUTH_ERROR_MSG);
    return Promise.reject(AUTH_ERROR_MSG);
  } else if (error.errorType === 'server') {
    const tip = error.errorMsg || tipList[error.errorCode];
    Toast(tip || '未知服务器错误');
    return Promise.reject(error.errorMsg || tipList[error.errorCode]);
  }
  return Promise.reject(error.errorMsg);
};

export default handleError;
