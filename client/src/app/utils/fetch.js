import fetch from 'isomorphic-fetch';

const fetchOptions = (method = 'GET', body = null) => {
  const credentials = 'include';
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  body = body ? { body: JSON.stringify(body) } : {};
  return { ...{ credentials, headers, method }, ...body };
};

const fetchResponse = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

const fetchData = ({ url = '', id = '', method = 'GET', data = null } = {}) => {
  return fetch(url + id, fetchOptions(method, data))
        .then(fetchResponse);
};

export default {
  fetchData,
};
