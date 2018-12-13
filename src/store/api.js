import request from '@/utils/request';
import store from '@/store';

// 全局配置
export const fetchGetConfig = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/dict/getDictValueBykey`,
    method: 'post',
    params,
  });

// 购物车类
export const fetchAddCart = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/cart/meagerCart`,
    method: 'post',
    params,
  });

export const fetchGetCart = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/cart/get`,
    method: 'post',
    params,
  });

export const fetchGetUserByConId = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/basCustomer/getByConId`,
    method: 'post',
    params,
  });

export const fetchGetUserByMobile = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/basCustomer/getByMobile`,
    method: 'post',
    params,
  });
