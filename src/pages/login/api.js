import request from '@/utils/request';
import store from '@/store';

export const fetchGetCode = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/tldIdentifyCode/getByMobile`,
    method: 'post',
    params,
  });

export const fetchLogin = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/basCustomer/unifyLogin`,
    method: 'post',
    params,
  });

export const fetchGetUser = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/basCustomer/getByConId`,
    method: 'post',
    params,
  });
