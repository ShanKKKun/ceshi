import request from '@/utils/request/';
import store from '@/store';

export const fetchGetCatrgories = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/pntProduct/getPntCategories`,
    method: 'post',
    params,
  });

export const fetchGetPage = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/page/getPage`,
    method: 'post',
    params,
  });

export const hold = 1;
