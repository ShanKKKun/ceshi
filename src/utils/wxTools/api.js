import request from '@/utils/request';
import store from '@/store';

export default params =>
  request({
    url: `${store.state.domainInfo.wechatUrl}/wechat/share/getTicket`,
    method: 'post',
    params,
  });
