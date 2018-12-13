/**
 *  校验session是否过期
 */
import { DEV_BASE_API, STORAGE_KEY_SESSION } from '@/config';

const requestUrl = `${DEV_BASE_API}/getUser`;

export default () => {
  const xhr = new XMLHttpRequest();
  const result = {
    isSuccess: null, // 判断接口是否请求成功
    isValidate: null, // 判断session是否过期
  };
  xhr.open('GET', requestUrl, false);
  const sessionId = localStorage.getItem(STORAGE_KEY_SESSION);
  xhr.setRequestHeader('Authorization', sessionId);
  xhr.onload = () => {
    if (this.status === 200 || this.status === 304) {
      const response = JSON.parse(this.responseText);
      if (response.success !== undefined) {
        result.isSuccess = true;
        result.isValidate = response.code === '200';
      }
    }
  };
  xhr.onerror = () => {
    result.isSuccess = false;
  };
  try {
    xhr.send(null);
  } catch (e) {
    result.isSuccess = false;
  }

  return result;
};
