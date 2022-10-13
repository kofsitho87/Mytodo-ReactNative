import axios from 'axios';

const ApiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 2500,
});

// ApiClient.interceptors.response.use(
//   response => {
//     // console.log('######', response.data);
//     return response.data;
//   },
//   error => {
//     // console.log('status', error.response.status);
//     return error;
//   },
// );

export {ApiClient};
