// import { createClient } from 'contentful';

const contentful = require('contentful');


const client = contentful.createClient({
  space: 'xq63yx1ac4kb',
  accessToken: 'PBu8jhu-BzWB-iSpf3o2S7XKGn8gzZmxuysOWAN-afs',
});

module.exports = client;