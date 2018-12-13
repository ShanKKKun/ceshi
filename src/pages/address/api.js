import request from '@/utils/request';
import store from '@/store';

export const fetchGetAddress = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/address/get`,
    method: 'post',
    params,
  });

export const fetchAddAddress = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/address/add`,
    method: 'post',
    params,
  });

export const fetchUpdateAddress = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/address/update`,
    method: 'post',
    params,
  });

export const fetchDeleteAddress = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/address/delete`,
    method: 'post',
    params,
  });
