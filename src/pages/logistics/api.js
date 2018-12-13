import request from '@/utils/request';
import store from '@/store';

export const fetchGetLogistics = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/express/selectByOrderIdAndSysAccount`,
    method: 'get',
    params,
  });

export const temp = {};
