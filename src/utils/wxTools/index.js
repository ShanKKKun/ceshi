import store from '@/store';
import { wx } from '@/main';
import fetchGetConfig from './api';

export const setWxConfig = url =>
  new Promise((resolve, reject) => {
    console.log('setwxconfig');
    fetchGetConfig({
      sysAccount: store.state.sysAccount,
      url,
    }).then((res) => {
      wx.config({
        debug: false,
        appId: res.result.appId,
        timestamp: res.result.timestamp,
        nonceStr: res.result.noncestr,
        signature: res.result.signature,
        jsApiList: [
          'onMenuShareAppMessage',
          'onMenuShareTimeline',
        ],
      });
      resolve();
    }).catch(error => reject(error));
  });

export const setWxShare = (title, desc, imgUrl, link, successCb, cancelCb) => {
  wx.ready(() => {
    wx.onMenuShareAppMessage({
      title,
      desc,
      imgUrl,
      link,
      dataUrl: '',
      success: successCb,
      cancel: cancelCb,
    });
  });
};
