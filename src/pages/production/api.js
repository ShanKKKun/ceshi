import request from '@/utils/request';
import store from '@/store';

export const fetchGetProduct = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/pntProduct/qryProductDetail`,
    method: 'post',
    params,
  });

export const fetchGetSkuDetail = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/sku/qrySkuBySkuId`,
    method: 'post',
    params,
  });

export const fetchGetSku = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/pntProduct/getPntSkuInfo`,
    method: 'post',
    params,
  });
