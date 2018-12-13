import store from '@/store';

window.initNative = (type) => {
  store.commit('setNative', type);
};

export const shareToWX = (params) => { // eslint-disable-line
  const { Native } = window;
  if (Native !== undefined) { // 判断原生api是否加载成功
    Native.shareToWX(JSON.stringify(params));
  } else {
    console.warn('原生api加载失败');
  }
};
