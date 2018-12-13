import request from '@/utils/request';
import store from '@/store';

export default params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/qrCode/getQrCode`,
    method: 'post',
    params,
  });
