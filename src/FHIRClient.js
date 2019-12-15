const axios = require('axios');
const { getUrlFromObject, getUrlFromString } = require('./utils/urlUtils.js');

class FHIRClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async read(param) {
    let requestUrl;
    if (typeof param === 'string') {
      requestUrl = getUrlFromString(this.baseUrl, param);
    } else if (param instanceof Object) {
      requestUrl = getUrlFromObject(this.baseUrl, param);
    } else {
      throw new Error('Argument to read must be a string or an object');
    }

    const response = await axios.get(requestUrl);
    return response.data;
  }
}

module.exports = FHIRClient;
