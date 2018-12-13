import request from '@/utils/request';
import store from '@/store';

export const fetchGetOrderDetail = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/order/getOrderItems`,
    method: 'get',
    params,
  });

export const fetchGetOrderInfo = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/order/getOrderItems`,
    method: 'get',
    params,
  });

export const fetchSubmitReceive = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/order/confirmItem`,
    method: 'post',
    params,
  });

export const fetchCancelOrder = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/order/cancelItem`,
    method: 'post',
    params,
  });
