const axios = require('axios');
const querystring = require('querystring');
const _ = require('lodash');

class FHIRClient {
  constructor(baseURL, headers = {}) {
    this.baseURL = baseURL;
    this.httpClient = axios.create({
      baseURL,
      headers,
    });
  }

  async create({ resourceType, body }) {
    if (!resourceType) {
      throw new Error('resourceType is required');
    } else if (!body) {
      throw new Error('body is required');
    }

    const response = await this.httpClient.post(resourceType, body);
    return response.data;
  }

  async read({ resourceType, id }) {
    if (!resourceType) {
      throw new Error('resourceType is required');
    } else if (!id) {
      throw new Error('id is required');
    }

    const response = await this.httpClient.get(`${resourceType}/${id}`);
    return response.data;
  }

  async update({ resourceType, id, body }) {
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

  async delete({ resourceType, id }) {
    if (!resourceType) {
      throw new Error('resourceType is required');
    } else if (!id) {
      throw new Error('id is required');
    }

    const response = await this.httpClient.delete(`${resourceType}/${id}`);
    return response.data;
  }

  async search({ resourceType, params = {} }) {
    if (!resourceType) {
      throw new Error('resourceType is required');
    }

    const searchString = _.isEmpty(params) ? '' : `?${querystring.stringify(params)}`;
    const response = await this.httpClient.get(resourceType + searchString);
    return response.data;
  }
}

module.exports = FHIRClient;
