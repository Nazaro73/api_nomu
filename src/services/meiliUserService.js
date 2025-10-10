const { meiliClient } = require('../config/meilisearch');

// Index "users"
const index = meiliClient.index('users');

/**
 * Indexe un tableau d'utilisateurs dans Meilisearch
 * @param {Array} data - Données utilisateurs à indexer
 */
exports.indexUsers = async (data) => {
  try {
    return await index.addDocuments(data, { primaryKey: 'id' });
  } catch (err) {
    console.error('Erreur indexUsers:', err.message);
    throw err;
  }
};

/**
 * Recherche dans l'index 'users' selon une requête textuelle
 * @param {string} query - Requête utilisateur
 */
exports.searchInUsers = async (query) => {
  try {
    return await index.search(query);
  } catch (err) {
    console.error('Erreur searchInUsers:', err.message);
    throw err;
  }
};
