<template>
  <van-pull-refresh v-model="refreshLoading" @refresh="onRefresh">
    <van-list
      v-model="listLoading"
      :finished="loadFinished"
      @load="onLoad"
    >
      <div v-if="giftsList.length === 0" class="no-data">
        暂未查询到数据~~~
      </div>
      <div v-else class="gifts-list">
        <div class="list-item" v-for="detail in giftsList" :key="detail.id">
          <div class="item-img">
            <img :src="detail.imageUrl">
          </div>
          <div class="item-info">
            <div class="info-title">
              <span class="title-info">{{ detail.pntName }}</span>
              <span class="title-status">{{ getStatusText(detail.status) }}</span>
            </div>
            <div class="info-row ellipsis">接收人昵称：{{ detail.receiveName }}</div>
            <div class="info-row ellipsis">接收人号码：{{ detail.receiveMobile }}</div>
            <div class="info-row">赠送数量：{{ detail.transQty }}</div>
            <div class="info-row">
              <div class="row-left">{{ detail.createDt }}</div>
              <div class="row-right item-btns">
                <span
                  v-if="detail.status === 0 && tabType === 'receive'"
                  class="btn"
                  @click="handleReceive(detail)"
                >
                  领取
                </span>
                <span
                  v-if="detail.status === 0 && tabType === 'receive'"
                  class="btn"
                  @click="handlerRefuse(detail)"
                >
                  拒绝
                </span>
                <span
                  v-if="detail.status === 0 && tabType === 'send'"
                  class="btn"
                  @click="handlerCancle(detail)"
                >
                  撤回
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-list>
  </van-pull-refresh>
</template>

<script type="text/javascript">
import { PullRefresh, List } from 'vant';
import { fetchGetGiftsList, fetchUpdateGift } from '../api';

export default {
  name: 'gifts-list',
  components: {
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
  },
  props: {
    tabType: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      refreshLoading: false, // 下拉刷新是否处于刷新状态
      listLoading: false, // 上拉加载是否处于加载中状态
      loadFinished: false, // 上拉加载是否全部加载完毕
      pageSize: 8,
      pageNum: 1,
      giftsList: [],
      fetchTag: true,
    };
  },
  methods: {
    getStatusText(status) {
      let statusText = '';
      switch (status) {
        case 0:
          statusText = '待领取';
          break;
        case 1:
          statusText = '已过期';
          break;
        case 2:
          statusText = '已撤回';
          break;
        case 3:
          statusText = '已接收';
          break;
        default:
          statusText = '未知状态';
          break;
      }
      return statusText;
    },
    handleReceive(detail) {
      this.$dialog.confirm({
        message: '确认要接受吗？',
      }).then(() => fetchUpdateGift({
        id: detail.id,
        conId: this.$store.state.userInfo.conId,
        status: 3,
      })).then((res) => {
        if (res.resultCode) {
          detail.status = 3;
        }
      }).catch(err => console.warn(err));
    },
    handlerRefuse(detail) {
      this.$dialog.confirm({
        message: '确认要拒绝吗？',
      }).then(() => fetchUpdateGift({
        id: detail.id,
        status: 2,
      })).then((res) => {
        if (res.resultCode) {
          detail.status = 2;
        }
      }).catch(err => console.warn(err));
    },
    handlerCancle(detail) {
      this.$dialog.confirm({
        message: '确认要撤回吗？',
      }).then(() => fetchUpdateGift({
        id: detail.id,
        status: 2,
      })).then((res) => {
        if (res.resultCode) {
          detail.status = 2;
        }
      }).catch(err => console.warn(err));
    },
    onRefresh() {
      this.giftsList = [];
      this.pageNum = 1;
      this.loadFinished = false;
      this.fetchTag = true;
      this.getList()
        .then(() => {
          setTimeout(() => {
            this.refreshLoading = false;
          }, 500);
        })
        .catch(() => {
          setTimeout(() => {
            this.refreshLoading = false;
            this.$toast('服务器异常，请刷新重试！');
          }, 500);
        });
    },
    onLoad() {
      if (this.loadFinished) {
        return false;
      }
      return this.getList()
        .then(() => {
          setTimeout(() => {
            this.listLoading = false;
          }, 500);
        })
        .catch(() => {
          this.listLoading = false;
          this.loadFinished = true;
          this.fetchTag = true;
          this.$toast('服务器异常，请刷新重试！');
        });
    },
    getList() {
      if (!this.fetchTag) { // 增加一个请求标识，解决fresh与load组件重复请求的问题
        return Promise.resolve();
      }
      this.fetchTag = false;
      return fetchGetGiftsList({
        type: this.tabType === 'send' ? 1 : 2,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        conId: this.$store.state.userInfo.conId,
        mobile: this.$store.state.userInfo.mobile,
      }).then((res) => {
        this.giftsList = this.giftsList.concat(res.result.list);
        this.pageNum = this.pageNum + 1;
        this.fetchTag = true;
        if (res.result.list.length < this.pageSize) {
          this.loadFinished = true;
        }
      });
    },
  },
  activated() {
    this.giftsList = [];
    this.pageNum = 1;
    this.fetchTag = true;
    this.refreshLoading = false;
    this.listLoading = false;
    this.loadFinished = false;
    this.getList();
  },
};
</script>

<style lang="less" scoped>
@import '../../../styles/theme.less';
@import '../../../styles/function.less';

.gifts-list {
  min-height: 73vh;
}
.no-data {
  width: 100%;
  padding-top: 30vh;
  padding-bottom: 30vh;
  text-align: center;
  color: #999;
}
.list-item {
  padding: 20px 12px;
  display: flex;
  line-height: 16px;
  font-size: 14px;
  color: #323232;
  background-color: #FFF;
  &:not(:first-child) {
    border-top: 1px solid #EFEFEF;
  }
  .item-img {
    display: flex;
    align-items: center;
    img {
      width: 70px;
    }
  }
  .item-info {
    margin: 0 8px;
    flex-grow: 1;
    .info-title {
      margin-bottom: 5px;
      display: flex;
      justify-content: space-between;
      .title-status {
        color: red;
      }
    }
    .info-row {
      color: #787878;
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
    }
    .ellipsis {
      .ellipsis;
    }
  }
  .item-btns {
    display: flex;
    justify-content: flex-end;
    .btn {
      display: inline-block;
      color: #787878;
      height: 20px;
      line-height: 20px;
      border-radius: 10px;
      font-size: 12px;
      padding: 0 7px;
      border: 1px solid #787878;
      &:not(:first-child) {
        margin-left: 10px;
      }
    }
  }
}
</style>
