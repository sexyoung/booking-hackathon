import fetch from './fetch';

const getApi    = url       => fetch.fetchData({ url });
const deleteApi = url       => fetch.fetchData({ url, method: 'DELETE' });
const postApi   = (url, data) => fetch.fetchData({ url, method: 'POST', data });
const updateApi = (url, data) => fetch.fetchData({ url, method: 'PUT', data });

export {
  getApi,
  postApi,
  updateApi,
  deleteApi,
};
