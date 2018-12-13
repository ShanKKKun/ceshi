<template>
  <van-pull-refresh v-model="refreshLoading" @refresh="onRefresh">
    <div class="gifts-stock">
      <div v-if="stockList.length === 0" class="no-data">
        您尚未采购礼品~~
      </div>
        <div v-else class="stock-item" v-for="detail in stockList" :key="detail.id">
          <div class="item-img">
            <img :src="detail.imageUrl">
          </div>
          <div class="item-info">
            <div class="info-title">
              {{ detail.pntName }}
            </div>
            <div class="info-desc">
              {{ detail.sku }}
            </div>
            <div class="info-stock">
              总库存：{{ detail.quantity }}
            </div>
            <div class="info-handler">
              <van-stepper
                class="handler-stepper"
                :max="detail.quantity"
                v-model="detail.stepperNum"
              />
              <div class="handler-btns">
                <span class="btn" @click="onClickSend(detail)">赠送</span>
                <span class="btn" @click="onClickExtract(detail)">提取</span>
              </div>
            </div>
          </div>
        </div>
    </div>
  </van-pull-refresh>
</template>

<script type="text/javascript">
import { Stepper, PullRefresh } from 'vant';
import { fetchGetStockList } from '../api';

export default {
  name: 'gifts-stock',
  components: {
    [Stepper.name]: Stepper,
    [PullRefresh.name]: PullRefresh,
  },
  data() {
    return {
      pageNum: 0,
      stockList: [],
      refreshLoading: false,
    };
  },
  methods: {
    getStockList() {
      fetchGetStockList({
        sysAccount: this.$store.state.sysAccount,
        conId: this.$store.state.userInfo.conId,
        pageNum: this.pageNum,
        pageSize: 30, // TODO 分页
      }).then((res) => {
        const list = res.result;
        list.forEach((item, index) => {
          list[index].stepperNum = 1;
        });
        this.stockList = list;
        setTimeout(() => {
          this.refreshLoading = false;
        }, 500);
      }).catch(err => console.warn(err));
    },
    onClickExtract(detail) {
      this.$router.push({
        name: 'gifts-extract',
        params: {
          detail,
        },
      });
    },
    onClickSend(detail) {
      this.$router.push({
        path: `/gifts-send/${detail.skuId}/${detail.stepperNum}`,
      });
    },
    onRefresh() {
      this.getStockList();
    },
  },
  activated() {
    this.getStockList();
  },
};
</script>

<style lang="less" scoped>
@import '../../../styles/function.less';
.no-data {
  width: 100%;
  padding-top: 35vh;
  text-align: center;
  color: #999;
  padding-bottom: 30vh;
}
.gifts-stock {
  min-height: 70vh;
}
.stock-item {
  width: 100%;
  box-sizing: border-box;
  padding: 20px 10px;
  background-color: #FFF;
  display: flex;
  font-size: 14px;
  flex-grow: 1;
  &:not(:first-child) {
    border-top: 1px solid #EFEFEF;
  }
  .item-img {
    display: flex;
    align-items: center;
    img {
      width: 70px;
    }
    margin-right: 5px;
  }
  .item-info {
    flex: 1;
    .info-title {
      margin-bottom: 5px;
      font-size: 14px;
      .ellipsis;
    }
    .info-desc {
      margin-bottom: 5px;
      font-size: 12px;
      color: #999;
    }
    .info-stock {
      color: #666;
      font-size: 12px;
    }
    .info-handler {
      display: flex;
      height: 30px;
      line-height: 30px;
      justify-content: space-between;
      margin-top: 10px;
      .handler-btns {
        display: flex;
        align-items: center;
        .btn {
          display: inline-block;
          height: 22px;
          line-height: 22px;
          padding: 0 10px;
          border: 1px solid #787878;
          border-radius: 11px;
          color: #787878;
          &:not(:last-child) {
            margin-right: 12px;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 350px) {
  .stock-item {
    font-size: 12px;
  }
  .handler-stepper {
    transform: scale(0.9);
  }
}
</style>
