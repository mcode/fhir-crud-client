const axios = require('axios');

class FHIRClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.httpClient = axios.create({
      baseURL,
    });
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
}

module.exports = FHIRClient;
