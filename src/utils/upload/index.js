import request from '@/utils/request';
import store from '@/store';

export const fetchUploadBase64 = params =>
  request({
    url: `${store.state.domainInfo.webUrl}/api/file/uploadBase64`,
    method: 'post',
    params,
  });

export const fetchUpload = (file) => {
  const data = new FormData();
  data.append('files', file);
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        resolve(xhr);
      }
    };
    xhr.open('POST', `${store.state.domainInfo.webUrl}/api/file/uploadMultiFiles`);
    xhr.send(data);
  });
};
