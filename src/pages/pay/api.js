import request from '@/utils/request';
import store from '@/store';

export const fetchGetCoupon = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/coupon/getByConId`,
    method: 'post',
    params,
  });

export const fetchCreateOrder = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/order/createOrder`,
    method: 'post',
    params,
  });

export const fetchGetPrice = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/order/getOrderPrice`,
    method: 'post',
    params,
  });

export const fetchBalancePay = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/order/fundPay`,
    method: 'post',
    params,
  });

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
