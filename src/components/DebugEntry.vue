<template>
  <div class="entry-debug" @click="handleClick">
    <van-dialog
      v-model="showDialog"
      show-cancel-button
      cancel-button-text="我错了"
      confirm-button-text="继续"
      @confirm="handleConfirm"
      title="你最好知道你在做什么！"
    >
      <div class="dialog-content">
        <p class="tip">警告！您将删除您的账号！</p>
        <van-field v-model="code" placeholder="请输入手机号" />
      </div>
    </van-dialog>
  </div>
</template>

<script type="text/javascript">
import { Dialog, Field } from 'vant';
import { DEBUG_PSD } from '@/config';

export default {
  name: 'entry-debug',
  components: {
    [Dialog.name]: Dialog,
    [Field.name]: Field,
  },
  data() {
    return {
      entryCount: 0, // 点击计数，达到17次点击次数时开始判断是否开启调试
      fastClickTimer: null,
      fastClickCount: 0,
      showDialog: false,
      code: null,
    };
  },
  methods: {
    handleClick() {
      this.entryCount = this.entryCount + 1;
      if (this.entryCount === 5) {
        this.$toast('不要调皮噢~~~');
      }
      if (this.entryCount === 7) {
        this.$toast('再忍你一次！');
      }
      if (this.entryCount === 9) {
        this.$toast('我要报警了！');
      }
      if (this.entryCount < 10) {
        return false;
      }
      return this.checkAction();
    },
    checkAction() { // 三秒内再次点击三次打开弹窗
      if (!this.fastClickTimer) {
        this.fastClickTimer = setTimeout(() => {
          clearTimeout(this.fastClickTimer);
          this.fastClickTimer = null;
          this.fastClickCount = 0;
        }, 3000);
      }
      this.fastClickCount = this.fastClickCount + 1;
      if (this.fastClickCount === 3) {
        this.showDialog = true;
        this.fastClickCount = 0;
      }
    },
    handleConfirm() {
      if (this.code === DEBUG_PSD) {
        this.$store.commit('openDebugModel');
        this.$router.push({
          name: 'debug',
        });
      } else {
        this.$toast('您没有这个权限！');
      }
    },
  },
};
</script>

<style lang="less" scoped>
.dialog-content {
  width: 100%;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #EFEFEF;
}
.tip {
  padding-left: 10px;
  color: red;
}
</style>
