import request from '@/utils/request';
import store from '@/store';

export const fetchGetCart = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/cart/get`,
    method: 'post',
    params,
  });

export const fetchUpdateCount = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/cart/updateCart`,
    method: 'post',
    params,
  });

export const fetchDeleteCart = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/cart/delCartBatch`,
    method: 'post',
    params,
  });

export const fetchAddCart = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/cart/meagerCart`,
    method: 'post',
    params,
  });
