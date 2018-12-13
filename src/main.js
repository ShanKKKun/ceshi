import Vue from 'vue';
import { Dialog, Toast, Lazyload } from 'vant';

import wechat from '@/utils/wechat';
import authInit from '@/utils/authInit';
import '@/utils/native';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles/reset.less';
// import './registerServiceWorker';
import './error-monitor/fundebug';
// import './error-monitor/sentry';

Vue.config.productionTip = false;

Vue.use(Dialog).use(Toast).use(Lazyload).use(wechat); // 加载各种插件

export const wx = Vue.wechat; //eslint-disable-line

authInit().then(() => { // 优先获取微信授权，防止在微信环境下正确获取身份前就渲染页面数据的问题
  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app');
});
