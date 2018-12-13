import request from '@/utils/request';
import store from '@/store';

export const fetchSubmitService = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/tld/Service/createTldService`,
    method: 'post',
    params,
  });

export const fetchGetDetail = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/tld/Service/getServiceDetail`,
    method: 'post',
    params,
  });
