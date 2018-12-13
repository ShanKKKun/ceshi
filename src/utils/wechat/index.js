const { wx } = require('./wechat.js');

const plugin = {
  install(Vue) {
    Vue.prototype.$wechat = wx;
    Vue.wechat = wx;
  },
  $wechat: wx,
};

export default plugin;
export const { install } = plugin;
