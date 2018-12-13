import request from '@/utils/request';
import store from '@/store';

export const fetchGetList = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/order/getOrderList`,
    method: 'post',
    params,
  });

export const fetchGetOrder = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/order/order/update/order/${params.id}`,
    method: 'get',
    params,
  });

export const fetchSubmitReceive = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/order/confirmItem`,
    method: 'post',
    params,
  });

export const fetchDeleteOrder = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/order/delete`,
    method: 'post',
    params,
  });
