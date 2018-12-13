import request from '@/utils/request';
import store from '@/store';

export const fetchAliPay = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/alipay/alipayTradeWapPay`,
    method: 'post',
    params,
  });

export const fetchCreatWechatBill = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/wechat/createBill`,
    method: 'post',
    params,
  });
