import fetch from './fetch';

const getApi    = url         => fetch.fetchData({ url });
const postApi   = (url, data) => fetch.fetchData({ url, method: 'POST', data });
const updateApi = (url, data) => fetch.fetchData({ url, method: 'PUT', data });
const deleteApi = url         => fetch.fetchData({ url, method: 'DELETE' });

export {
  getApi,
  postApi,
  updateApi,
  deleteApi,
};
