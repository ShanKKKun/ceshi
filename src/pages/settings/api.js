import request from '@/utils/request';
import store from '@/store';

export const fetchUpdateCustomer = params => // eslint-disable-line
  request({
    url: `${store.state.domainInfo.webUrl}/api/basCustomer/updateCustomer`,
    method: 'post',
    params,
  });
