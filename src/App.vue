<template>
  <div id="app">
    <!-- 为微信外用户提供返回按钮的navbar，将应用体验保持一致，且利于后期包壳APP和PWA的需求 -->
    <van-nav-bar
      v-if="showNav"
      :title="title"
      left-text="返回"
      :right-text="shareBtn"
      left-arrow
      class="nav-bar"
      @click-left="onClickBack"
      @click-right="onShare"
    />
    <!-- <transition name="van-fade"> -->
      <!-- exclude保证页面数据在每一次进入时进行刷新 -->
      <keep-alive exclude="['order, cart']">
        <router-view :class="showNav ? 'hasnav' : ''"/>
      </keep-alive>
    <!-- </transition> -->
  </div>
</template>

<script type="text/javascript">
import { NavBar } from 'vant';
import isInnerBrowser from '@/utils/isInnerBrowser';
import { shareToWX } from '@/utils/native';

export default {
  name: 'app',
  components: {
    [NavBar.name]: NavBar,
  },
  data() {
    return {
      routerHeight: null, // 用于计算除去navbar后的剩余页面高度
    };
  },
  computed: {
    title() {
      return this.$store.state.title;
    },
    showNav() {
      return this.$store.state.showNav;
    },
    shareBtn() {
      return this.$store.state.nativeType ? '分享' : null;
    },
  },
  watch: {
    title() {
      // 当监听到title变化时即发生跳页后，为pageview的高度赋值，保证合理的页面呈现（如absolute布局的元素）
      // Q：由于监听title的变化并不靠谱，需要找到一个更好的监听触发
      this.$nextTick(() => { // 此处使用nextTick是因为title发生变化时页面还没渲染完成，querySelectorAll无法获取到页面元素
        const pageEl = document.querySelectorAll('.page-view');
        if (pageEl.length > 0) {
          pageEl[0].style.minHeight = `${this.routerHeight}px`;
        }
      });
    },
  },
  methods: {
    onClickBack() {
      this.$router.go(-1);
    },
    updateRouterHeight() {
      const navHeight = this.showNav ? document.querySelectorAll('.nav-bar')[0].offsetHeight : 0;
      const { clientHeight } = document.documentElement;
      const routerHeight = clientHeight - navHeight;
      this.routerHeight = routerHeight;
    },
    onShare() {
      shareToWX({
        title: '测试标题',
        desc: '测试描述',
        imgUrl: 'https://cdds.hubeta.com/group1/M00/01/87/wKgB9FtYJauAR2u0AAGUmbqoCiw528.jpg',
        linkUrl: 'https://cdds30.hubeta.com/distribution-mobile/?sysAccount=DLY#/index',
      });
    },
  },
  mounted() {
    this.$store.commit('toggleNavBar', !isInnerBrowser); // 根据是否为内置浏览器切换navbar显示或隐藏
    this.$nextTick(() => {
      this.updateRouterHeight();
      this.$store.dispatch('getCart'); // 购物车数据获取 TODO 将系统初始化时需要做的数据准备使用方法统一存放
    });
    // this.$store.dispatch('getConfig');
  },
};
</script>

<style lang="less">
@import './styles/theme.less';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #ECECEC;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  min-height: 100vh;
  .van-checkbox__icon--checked .van-icon {
    border-color: @main-color;
    background-color: @main-color;
  }
}
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100!important;
}
.hasnav {
  margin-top: 46px;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
