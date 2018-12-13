import request from '@/utils/request';
import store from '@/store';
import { DEV_BASE_API } from '@/config';

const origin = process.env.NODE_ENV === 'production'
  ? window.location.origin
  : DEV_BASE_API;

export default () => request({
  url: `${origin}/wb/api/sysAccount/getAccountBaseInfo`,
  method: 'post',
  params: {
    sysAccount: store.state.sysAccount,
  },
}).then((res) => {
  const weChatVersion = res.result.version;

  // 判断微信公众号版本信息 如公众号主体有更换 需重新拉取授权
  if (weChatVersion !== window.localStorage.getItem('weChatVersion')) {
    window.localStorage.clear();
    window.localStorage.setItem('weChatVersion', weChatVersion);
  }
  store.commit('setDomain', res.result);
});
