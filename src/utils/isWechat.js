/**
 *  [判断当前是否为微信环境]
 *  @Author   tj
 *  @DateTime 2018-08-13
 *  @return   {boolean}   [判断结果]
 */
const isWechat = () => {
  const agent = navigator.userAgent.toLowerCase();
  if (agent.indexOf('micromessenger') > -1) {
    return true;
  }
  return false;
};

export default isWechat();
