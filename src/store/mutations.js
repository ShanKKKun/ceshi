export default {
  setSysAccount(state, sysAccount) {
    state.sysAccount = sysAccount;
  },
  setDomain(state, domainInfo) {
    state.domainInfo = domainInfo;
  },
  setNative(state, type) {
    if (typeof type === 'string') {
      state.nativeType = type.toLowerCase();
    }
  },
  setLogo(state, logoImgUrl) {
    state.logoImgUrl = logoImgUrl;
  },
  setUrlParams(state, urlParams) {
    state.urlParams = urlParams;
  },
  toggleNavBar(state, showNav) {
    state.showNav = showNav;
  },
  setAddress(state, address) {
    state.addressInfo = address;
  },
  openDebugModel(state) {
    state.openDebug = true;
  },
  setConfig(state, config) {
    state.config = {
      ...state.config,
      ...config,
    };
  },
  updateBuyList(state, newList) {
    state.buyList = newList;
  },
  setRedirectPage(state, redirectPage) {
    state.redirectPage = redirectPage;
  },
  setCartList(state, cartList) {
    state.cartList = cartList;
    if (!state.userInfo.conId) { // 未登录，同步本地购物车
      localStorage.setItem(`cartList${state.sysAccount}`, JSON.stringify(cartList));
    }
  },
  setUserInfo(state, userInfo) {
    state.userInfo = {
      ...state.userInfo,
      ...userInfo,
    };
    localStorage.setItem(`userInfo${state.sysAccount}`, JSON.stringify(state.userInfo));
  },
  logout(state) {
    state.userInfo = {
      conName: null,
      conNo: null,
      rpName: null,
      sex: null,
      rpNo: null,
      conId: null,
      openId: null,
      mobile: null,
      avatar: null,
    };
  },
};
