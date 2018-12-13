/**
 *  [判断当前是否为内置浏览器]
 *  @Author   tj
 *  @DateTime 2018-08-13
 *  @return   {boolean}   [判断结果]
 */
const isInnerBrowser = () => {
  const agent = navigator.userAgent.toLowerCase();
  if (agent.indexOf('micromessenger') !== -1 || agent.indexOf('alipay') !== -1) {
    return true;
  }
  return false;
};

export default isInnerBrowser();
