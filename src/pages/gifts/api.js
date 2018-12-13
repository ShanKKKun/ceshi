import request from '@/utils/request';
import store from '@/store';

export const fetchGetStockList = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/basCustStock/selectBasCustStockList`,
    method: 'post',
    params,
  });

export const fetchGetGiftsList = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/giftTrans/selectGiftTransList`,
    method: 'post',
    params,
  });

export const fetchUpdateGift = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/giftTrans/updateStatusById`,
    method: 'post',
    params,
  });
