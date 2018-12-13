import request from '@/utils/request';
import store from '@/store';

export const fetchSend = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/giftTrans/giveGriftTrans`,
    method: 'post',
    params,
  });

export const temp = {};
