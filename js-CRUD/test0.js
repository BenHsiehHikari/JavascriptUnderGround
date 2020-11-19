
const ROUTE_META_DATA_BASE_URL = 'http://60.248.40.4:8008/ebus-ty-strapi/route-meta-data';

const ROUTE_META_DATA_API = {
  read: () => ROUTE_META_DATA_BASE_URL,
  update: (id) => `${ROUTE_META_DATA_BASE_URL}/${id}`,
  delete: (id) => `${ROUTE_META_DATA_BASE_URL}/${id}`,
};

export {
  ROUTE_META_DATA_API,
};