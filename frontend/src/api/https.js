import axios from 'axios';
import FlashMessage from '../utils/flashmessages';
import { DEFAULT_ERROR_NOTIFICATION } from '../utils/constent';

const qs = require('qs')

require('dotenv').config({ path: process.cwd() + '/.env.local' });

const API_BASE_URI =
  process.env.REACT_APP_BACKEND_URL;

const http = axios.create({
  baseURL: API_BASE_URI,
});

http.interceptors.request.use(function(config) {
  // Get fresh token every request
  const user =sessionStorage.getItem('Role');

  if (user) {
    config.headers.common['Authorization'] = sessionStorage.getItem('AccessToken');
  }

  return config;
});

// notify the store that the JWT token is no longer valid in case of HTTP 401
http.interceptors.response.use(
  (response) => {
    switch (response.config.method) {
      case 'put':
      case 'patch':
        FlashMessage.success('Updated item');
        break;
      case 'post':
        FlashMessage.success(response.status === 201 ? 'Item created' : 'Updated item');
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
      case 403:
        logOut();
        break;
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

export const createCRUDEndpoints = (URL_ROOT) => {
  const allAction = () => async () => {
    const response = await http({
      method: 'GET',
      url: URL_ROOT,
    });

    return response.data;
  };

  const listAction = () => async (filters, pageSize, page, sorting) => {
    // TODO: fix this
    if (!page) {
      page = 0;
    }

    const params = {
      filters,
      page_size: pageSize,
      page: page + 1,
      sorting,
    };

    const response = await http({
      method: 'GET',
      url: URL_ROOT,
      params: params,
      paramsSerializer: function(params) {
        return qs.stringify(params, { encode: false });
      },
    });

    return response.data;
  };

  const getAction = () => async (id) => {
    if (!id) {
      throw Error('No id passed');
    }
    const response = await http({
      method: 'GET',
      url: `${URL_ROOT}/${id}`,
    });
    response.data.id = id;

    return response.data;
  };

  const createAction = () => async (data) => {
    const response = await http({
      method: 'POST',
      url: `${URL_ROOT}`,
      data,
    });

    return response.data;
  };

  const deleteAction = () => async (id) => {
    const response = await http({
      method: 'DELETE',
      url: `${URL_ROOT}/${id}`,
    });
    return response.data;
  };

  const updateAction = () => async (data) => {
    const response = await http({
      method: 'PUT',
      url:`${URL_ROOT}/${data.id}`,
      data,
    });

    return response.data;
  };

  return {
    all: allAction,
    list: listAction,
    create: createAction,
    update: updateAction,
    get: getAction,
    remove: deleteAction,
  };
};
