import * as axios from 'axios';
import { store, setError } from '../store';

const BASE_URL = 'http://localhost:8081/';

export const request = (url, method = 'GET', body, options) => {
  const fetchOpts = {
    method,
    credentials: 'include',
    data: JSON.stringify(body),
    url: `${BASE_URL}${url}`
  };

  Object.assign(fetchOpts, options);
  const promise = axios.request(fetchOpts)
    .then(({ data }) => {
      if (data.error) {
        return Promise.reject(data.error);
      }
      return Promise.resolve(data);
    });

  promise.catch(error => store.dispatch(setError(String(error))));

  return promise;
};

export const rest = {
  get(url) {
    return request(url);
  },

  post(url, body) {
    const options = {
      headers: {
        'Content-type': 'application/json; charset=utf-8'
      }
    };
    return request(url, 'POST', body, options);
  },

  put(url, body) {
    const options = {
      headers: {
        'Content-type': 'application/json; charset=utf-8'
      }
    };
    return request(url, 'PUT', body, options);
  },

  delete(url) {
    return request(url, 'DELETE');
  }
};
