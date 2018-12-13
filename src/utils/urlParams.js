export const getUrlParams = (name, str) => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  let r = '';
  if (!str) {
    r = window.location.search.substr(1).match(reg);
  } else {
    r = str.substr(1).match(reg);
  }
  if (r !== null) return decodeURI(r[2]);
  return null;
};

/**
 *  [解析url地址中携带的指定参数，参数使用decodeURIComponent方法进行解密]
 *  @Author   tj
 *  @DateTime 2018-08-11
 *  @param    {string}   key [需要解析的参数的键值]
 *  @return   {string}       [该参数值]
 */
export const getDecodeUrlParams = (key, url) => {
  let value = '';
  if (!url) {
    url = window.location.search;
  }
  const params = getUrlParams('params', url);
  if (params !== undefined) {
    value = JSON.parse(decodeURIComponent(decodeURIComponent(params)));
  }
  return value ? value[key] : '';
};

/**
 *  [将原始url地址处理为带参url，参数使用decodeURIComponent方法进行加密，防止浏览器误解析]
 *  @Author   tj
 *  @DateTime 2018-08-11
 *  @param    {string}   url    [需要加参数的原url地址]
 *  @param    {object}   params [需要加在url中的数据]
 *  @return   {string}          [携带参数的url地址]
 */
export const setDecodeUrlParams = (url, params) => {
  const paramsStr = encodeURIComponent(JSON.stringify(params));
  return `${url}?params=${encodeURIComponent(paramsStr)}`;
};
