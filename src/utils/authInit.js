import { Toast } from 'vant';
import { getUrlParams, setDecodeUrlParams, getDecodeUrlParams } from '@/utils/urlParams';
import store from '@/store';
import request from '@/utils/request';
import { fetchGetUser } from '@/pages/login/api';
import { fetchAddCart } from '@/pages/cart/api';
import { ORIGIN } from '@/config';
import isWechat from './isWechat';

const getWechatAuth = (sysAccount) => {
  // 获取微信授权
  const { location } = window;
  const redirectUriPath = `${location.origin}${location.pathname}`;
  const redirectUri = setDecodeUrlParams(redirectUriPath, {
    search: location.search,
    hash: location.hash,
    sysAccount,
  });
  request({
    url: `${store.state.domainInfo.webUrl}/wechat/url/getAuthorizeURL`,
    method: 'post',
    params: {
      sysAccount,
      redirectUri,
      state: '',
      snsapiBase: true,
    },
  }).then((res) => {
    location.replace(res.result);
  });
};

const getDomain = sysAccount => request({
  url: `${ORIGIN}/wb/api/sysAccount/getAccountBaseInfo`,
  method: 'post',
  params: {
    sysAccount,
  },
}).then((res) => {
  const weChatVersion = res.result.version;

  // 判断微信公众号版本信息 如公众号主体有更换 需重新拉取授权
  if (weChatVersion !== window.localStorage.getItem(`weChatVersion${sysAccount}`)) {
    window.localStorage.clear();
    window.localStorage.setItem(`weChatVersion${sysAccount}`, weChatVersion);
  }
  store.commit('setDomain', res.result);
  store.commit('setLogo', res.result.logo);
});

// 获取用户信息成功后，设置购物车、个人中心等数据
const setUserInfo = (sysAccount, conId, openId) => {
  if (conId) {
    fetchGetUser({
      conId,
    }).then((resData) => {
      const userInfo = {
        conName: resData.result.conName,
        conNo: resData.result.conNo,
        rpName: resData.result.rpName,
        sex: resData.result.sex,
        rpNo: resData.result.rpNo,
        rpId: resData.result.rpId,
        mobile: resData.result.mobile,
        avatar: resData.result.pic,
        conId,
        openId,
      };
      const hash = getDecodeUrlParams('hash');
      const search = getDecodeUrlParams('search');
      const { location } = window;
      const redirectPage = `${location.origin}${location.pathname}${search}${hash}`;
      store.commit('setUserInfo', userInfo);
      location.replace(redirectPage);
    });
  } else {
    const userInfo = {
      openId,
    };
    const hash = getDecodeUrlParams('hash');
    const search = getDecodeUrlParams('search');
    const { location } = window;
    const redirectPage = `${location.origin}${location.pathname}${search}${hash}`;
    store.commit('setUserInfo', userInfo);
    location.replace(redirectPage);
  }
};

const getUser = (sysAccount) => {
  const userInfo = localStorage.getItem(`userInfo${sysAccount}`);
  if (userInfo && userInfo !== undefined) { // 存在本地缓存数据
    store.commit('setUserInfo', JSON.parse(userInfo));
    // const params = getUrlParams('params');
    // if (params) {
    //   store.commit(
    //     'setUrlParams',
    //     JSON.parse(decodeURIComponent(decodeURIComponent(params))),
    //   );
    // }
    // const { location } = window;
    // const redirectPage = `${location.origin}${location.pathname}${location.hash}`;
    // window.history.replaceState(null, null, redirectPage);
    if (isWechat) {
      // 登录后获取到conId，更新购物车列表中的conId
      const { cartList } = store.state;
      const { conId } = store.state.userInfo;
      cartList.forEach((item, index) => {
        cartList[index].conId = conId;
      });
      // 登陆成功后配置sentry用户信息
      if (window.$Raven) {
        window.$Raven.setUserContext({
          id: conId,
          sysAccount,
        });
      }
      if (cartList.length > 0) {
        // 登录成功，同步本地缓存数据到数据库
        fetchAddCart({
          cartList: JSON.stringify(cartList),
        });
      }
    }
  } else if (isWechat) {
    const accessCode = getUrlParams('code');
    if (!accessCode) {
      getWechatAuth(sysAccount);
    } else {
      request({
        url: `${store.state.domainInfo.webUrl}/wechat/info/getUser`,
        method: 'post',
        params: {
          sysAccount,
          code: accessCode,
        },
      }).then((res) => {
        setUserInfo(sysAccount, res.result.conId, res.result.openId);
      });
    }
  } else { // 其余情况，即在非微信环境下访问且没有本地缓存用户信息时，交给路由处理.校验用户信息并跳转登录
  }
};

export default () => {
  const sysAccount = getUrlParams('sysAccount')
    || window.localStorage.getItem('sysAccount')
    || getDecodeUrlParams('sysAccount');
  if (!sysAccount) {
    Toast('获取参数失败-sysAccount');
    return false;
  }
  window.localStorage.setItem('sysAccount', sysAccount);
  store.commit('setSysAccount', sysAccount);
  return getDomain(sysAccount).then(() => {
    getUser(sysAccount);
  }).catch(err => console.warn(err)); // eslint-disable-line
};
