const urlJoin = require('url-join');

const getUrlFromString = (baseUrl, slug) => urlJoin(baseUrl, slug);
const getUrlFromObject = (baseUrl, obj) => {
  const { resourceType, id } = obj;
  if (!resourceType) {
    throw new Error('resourceType is required');
  } else if (!id) {
    throw new Error('id is required');
  }

  return urlJoin(baseUrl, resourceType, id);
};

module.exports = {
  getUrlFromObject,
  getUrlFromString,
};
