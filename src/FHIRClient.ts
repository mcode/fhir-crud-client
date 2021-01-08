import axios, { AxiosInstance } from 'axios';
import querystring from 'querystring';
import _ from 'lodash';
import { RequestArgs, RequestHeaders } from './types';

export default class FHIRClient {
  baseURL: string;
  headers: any;
  httpClient: AxiosInstance;

  constructor(baseURL: string, headers: RequestHeaders = {}) {
    this.baseURL = baseURL;
    this.httpClient = axios.create({
      baseURL,
      headers
    });
  }

  setAuthToken(authToken: string) {
    if (!authToken) {
      throw new Error('authToken is required');
    }
    this.httpClient.defaults.headers.Authorization = `Bearer ${authToken}`;
  }

  updateRequestHeaders(newHeaders: any) {
    if (!newHeaders) {
      throw new Error('newHeaders is required');
    }
    // Don't just replace since Axios creates some custom headers
    this.httpClient.defaults.headers = {
      ...this.httpClient.defaults.headers,
      ...newHeaders
    };
  }

  async metadata() {
    const response = await this.httpClient.get('/metadata');
    return response.data;
  }

  async create({ resourceType, body }: RequestArgs) {
    if (!resourceType) {
      throw new Error('resourceType is required');
    } else if (!body) {
      throw new Error('body is required');
    }

    const response = await this.httpClient.post(resourceType, body);
    return response.data;
  }

  async read({ resourceType, id }: RequestArgs) {
    if (!resourceType) {
      throw new Error('resourceType is required');
    } else if (!id) {
      throw new Error('id is required');
    }

    const response = await this.httpClient.get(`${resourceType}/${id}`);
    return response.data;
  }

  async update({ resourceType, id, body }: RequestArgs) {
    if (!resourceType) {
      throw new Error('resourceType is required');
    } else if (!id) {
      throw new Error('id is required');
    } else if (!body) {
      throw new Error('body is required');
    }

    const response = await this.httpClient.put(`${resourceType}/${id}`, body);
    return response.data;
  }

  async delete({ resourceType, id }: RequestArgs) {
    if (!resourceType) {
      throw new Error('resourceType is required');
    } else if (!id) {
      throw new Error('id is required');
    }

    const response = await this.httpClient.delete(`${resourceType}/${id}`);
    return response.data;
  }

  async search({ resourceType, params = {} }: RequestArgs) {
    if (!resourceType) {
      throw new Error('resourceType is required');
    }

    const searchString = _.isEmpty(params) ? '' : `?${querystring.stringify(params)}`;
    const response = await this.httpClient.get(resourceType + searchString);
    return response.data;
  }

  async transaction({ body }: RequestArgs) {
    if (!body) {
      throw new Error('body is required');
    }

    const response = await this.httpClient.post('/', body);
    return response.data;
  }
}
