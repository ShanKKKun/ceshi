import { fetchGetCart, fetchAddCart } from '@/pages/cart/api';
import { Toast } from 'vant';
import { fetchGetConfig, fetchGetUserByConId, fetchGetUserByMobile } from './api';

export default {
  refreshUserById({ state, commit }, conId) {
    return new Promise((resolve, reject) => {
      fetchGetUserByConId({
        conId,
        sysAccount: state.sysAccount,
      }).then((resData) => {
        const userInfo = {
          conName: resData.result.conName,
          conNo: resData.result.conNo,
          rpName: resData.result.rpName,
          sex: resData.result.sex,
          rpNo: resData.result.rpNo,
          rpId: resData.result.rpId,
          conId: resData.result.id,
          openId: resData.result.sourceId,
          mobile: resData.result.mobile,
          avatar: resData.result.pic,
        };
        commit('setUserInfo', userInfo);
        resolve(resData);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  refreshUserByMobile({ state, commit }, mobile) {
    return new Promise((resolve, reject) => {
      fetchGetUserByMobile({
        mobile,
        sysAccount: state.sysAccount,
      }).then((resData) => {
        const userInfo = {
          conName: resData.result.conName,
          conNo: resData.result.conNo,
          rpName: resData.result.rpName,
          sex: resData.result.sex,
          rpNo: resData.result.rpNo,
          rpId: resData.result.rpId,
          conId: resData.result.id,
          openId: resData.result.sourceId,
          mobile: resData.result.mobile,
          avatar: resData.result.pic,
        };
        commit('setUserInfo', userInfo);
        resolve(resData);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  setTitle({ state }, title) {
    state.title = title; // 改变store标题，用来处理navbar
    document.title = title; // 改变实际页面标题
  },
  getCart({ state, commit }) {
    if (!state.userInfo.conId || !state.userInfo.mobile) { // 未登录从本地缓存拿数据，已登录从接口拿数据
      let cartList = localStorage.getItem(`cartList${state.sysAccount}`);
      if (cartList && cartList !== undefined) {
        cartList = JSON.parse(cartList);
      } else {
        cartList = [];
      }
      commit('setCartList', cartList);
    } else {
      fetchGetCart({ // 已登录时调用接口操作购物车
        conId: state.userInfo.conId,
      }).then((res) => {
        localStorage.removeItem(`cartList${state.sysAccount}`);
        const cartList = res.result;
        cartList.forEach((item, index) => {
          cartList[index].imageUrl = item.skus.imageUrl || '';
        });
        if (cartList.length > 0 && cartList[0].id) {
          commit('setCartList', cartList);
        } else {
          commit('setCartList', []);
        }
      }).catch(err => console.warn(err));
    }
  },
  addCart({ state, dispatch }, product) {
    if (state.userInfo.conId && state.userInfo.mobile) {
      fetchAddCart({
        cartList: JSON.stringify([{
          sysAccount: state.sysAccount,
          conId: state.userInfo.conId,
          skuId: product.skuId,
          skuNum: product.skuNum,
        }]),
      }).then((res) => {
        if (res.resultCode) {
          dispatch('addLocalCart', product);
        }
      }).catch(err => console.warn(err));
    } else {
      dispatch('addLocalCart', product);
    }
  },
  addLocalCart({ state, commit }, product) {
    product.sysAccount = state.sysAccount;
    product.conId = state.userInfo.conId;
    const { cartList } = state;
    let mergeTag = false; // 合并标识，判断是否已经进行合并操作，若遍历完后仍为false则进行新增操作
    cartList.forEach((item, index) => {
      if (item.skuId === product.skuId) { // 当本地购物车已存在添加的商品数据时，将数量进行合并
        cartList[index].skuNum = item.skuNum + product.skuNum;
        mergeTag = true;
      }
    });
    if (!mergeTag) {
      cartList.push(product);
    }
    commit('setCartList', cartList);
    Toast('添加成功');
  },
  getConfig({ state, commit }) {
    fetchGetConfig({
      sysAccount: state.sysAccount,
      groupCode: 'SysModuleConfig',
    }).then((res) => {
      commit('setConfig', res.result);
    });
  },
};
