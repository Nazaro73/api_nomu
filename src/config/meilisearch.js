const { MeiliSearch } = require('meilisearch');

// Initialisation du client Meilisearch
const meiliClient = new MeiliSearch({
  host: process.env.MEILI_HOST || 'http://localhost:7700',
  apiKey: process.env.MEILI_API_KEY,
});

module.exports = { meiliClient };
