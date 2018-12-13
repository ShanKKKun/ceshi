export default {
  title: '首页', // 页面标题
  isLogin: false,
  sysAccount: null,
  nativeType: null, // 是否为原生app内嵌webview，取值为：null、ios、android
  urlParams: {},
  userInfo: {
    conName: null,
    conNo: null,
    rpName: null,
    sex: null,
    rpNo: null,
    conId: null,
    // conId: '2B41B8103A524C779C8B12D4EAF81A89',
    // conId: '949AF14B289444ECA23DE0CFA033A23A',
    openId: null,
    mobile: null,
    avatar: null,
  },
  domainInfo: {},
  cartList: [], // 购物车列表
  buyList: [], // 结算列表
  addressInfo: {}, // 收货地址
  showNav: false, // 是否显示navbar
  openDebug: false, // 是否打开debug模式，false情况下无法访问debug页面
  config: {
    enableGifts: true,
  },
  logoImgUrl: null,
  redirectPage: null, // 存放跳转登录时前往访问的页面，登录成功后返回此页面
};
