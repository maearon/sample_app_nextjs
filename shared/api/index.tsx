// import axios from 'axios'

// let BASE_URL = ''
// if (process.env.NODE_ENV === 'development') {
//   BASE_URL = 'http://localhost:3001/api'
// } else {
//   BASE_URL = 'https://railstutorialapi.herokuapp.com/api'
// }

// axios.defaults.xsrfCookieName = 'CSRF-TOKEN';

// axios.defaults.xsrfHeaderName = 'X-CSRF-Token';

// axios.defaults.withCredentials = true;

// export default class API {
//     constructor(lang = 'EN') {
//         this.lang = lang
//     }
//     getHttpClient(baseURL = `${BASE_URL}`) {
//         var headers = {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//             'x-lang': this.lang
//         }
//         this.client = axios.create({
//             baseURL: baseURL,
//             headers: headers
//         })
//         return this.client
//     }
// }
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

let BASE_URL = ''
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:3001/api'
} else {
  BASE_URL = 'https://railstutorialapi.herokuapp.com/api'
}

axios.defaults.xsrfCookieName = 'CSRF-TOKEN';

axios.defaults.xsrfHeaderName = 'X-CSRF-Token';

axios.defaults.withCredentials = true;

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-lang': 'EN'
  },
});

API.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default API;
