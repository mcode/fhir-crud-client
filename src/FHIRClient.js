const axios = require('axios');

class FHIRClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.httpClient = axios.create({
      baseURL,
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
}

module.exports = FHIRClient;
