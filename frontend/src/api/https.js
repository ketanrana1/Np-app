import axios from 'axios';
import FlashMessage from '../utils/flashmessages';
import { DEFAULT_ERROR_NOTIFICATION } from '../utils/constent';

const API_BASE_URI =
  process.env.REACT_APP_BACKEND_URL;

const http = axios.create({
  baseURL: `${API_BASE_URI}/api`,
});

http.interceptors.request.use(function (config) {
  // Get fresh token every request
  const user = sessionStorage.getItem('Role');

  if (user) {
    config.headers.common['Authorization'] = sessionStorage.getItem('AccessToken');
  }

  return config;
});

// notify the store that the JWT token is no longer valid in case of HTTP 401
http.interceptors.response.use(
  (response) => {
    const { data: { message } } = response
    // console.log("response from http", response)
    switch (response.config.method) {
      case 'put':
      case 'patch':
        FlashMessage.success('Updated item');
        break;
      case 'post':
        FlashMessage.success(response.status === 201 ? 'Item created' : message);
        break;
      case 'delete':
        FlashMessage.success('Item deleted');
        break;
    }

    return response;
  },
  (error) => {
    const response = error.response;

    if (!response) {
      const message = 'Unable to communicate with the server';

      FlashMessage.error(message);
      console.error(message);

      return Promise.reject(error);
    }

    switch (response.status) {
      case 401:

      case 406:
        FlashMessage.error('Invalid or missing values');
        break;
      default:
        FlashMessage.error(DEFAULT_ERROR_NOTIFICATION);
    }

    return Promise.reject(error);
  }
);

export { http };
