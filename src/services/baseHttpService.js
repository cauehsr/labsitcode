import axios from 'axios';

const api_key = '976c2a778ec14707a4fcdbefac822d9a';

export default class BaseHttpService {
  constructor() {}

  // Methods Rest
  // Principals parameters:
  // url: Method URL
  // payload: parameters to send through call
  // removeBearerToken: when explicit defined, makes the call without the bearer token in the header
  get = (url, removeBearerToken) =>
    axios.get(url, !removeBearerToken && this.header);

  post = (url, payload) =>
    axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key': api_key,
      },
    });

  postLogin = (url, payload) => axios.post(url, payload, this.loginHeader);

  autoLoginPost = (url, payload) =>
    axios.post(url, payload, this.autoLoginHeader);

  put = (url, payload, removeBearerToken) =>
    axios.put(url, payload, !removeBearerToken && this.header);

  patch = (url, payload, removeBearerToken) =>
    axios.patch(url, payload, !removeBearerToken && this.header);

  _delete = (url, removeBearerToken) =>
    axios.delete(url, !removeBearerToken && this.header);

  upload = (url, formData) =>
    axios.post(url, formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
}
