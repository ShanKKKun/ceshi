import request from '@/utils/request';
import store from '@/store';

export default params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/sysAccount/getPublicPlatformQrCode`,
    method: 'post',
    params: {
    	sysAccount: store.state.sysAccount,
    	sceneKey: 'QR_CODE_MAIN',
    },
  });
