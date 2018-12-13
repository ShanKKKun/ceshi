import Vue from 'vue';
import Router from 'vue-router';
import { WHITE_PAGE_LIST, DEBUG_PSD } from '@/config';
import { Toast } from 'vant';
// import { GlobalLoading } from '@/native-components/LoadingTip';
import Loading from '@/native-components/LoadingTip';
import store from './store';

Vue.use(Router);

const router = new Router({
  routes: [],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});

const loading = new Loading('页面加载中...');

router.beforeEach((to, from, next) => {
  loading.show('page');
  if (!WHITE_PAGE_LIST[to.name]) { // 当页面不在免登陆白名单内时校验用户登录状态信息
    // 校验用户登录状态
    if (!store.state.userInfo.mobile) { // 存在conId且不存在手机号，保证微信环境下已经拿完授权
      Toast('请先登录');
      store.commit('setRedirectPage', to);
      loading.hide('page');
      next({
        name: 'login',
      });
      return false;
    }
  }
  if (/\/http/.test(to.path)) { // 外链跳转时不使用路由
    const url = to.path.split('http')[1];
    window.location.href = `http${url}`;
  }
  next();
  return true;
});

router.afterEach((to) => {
  loading.hide('page');
  store.dispatch('setTitle', to.meta.title || document.title);
});

export default router;
