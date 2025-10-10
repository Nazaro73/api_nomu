const { meiliClient } = require('../config/meilisearch');

// Index "locals"
const index = meiliClient.index('locals');

/**
 * Récupère tous les documents dans l'index 'locals'
 */
exports.getLocals = async () => {
  try {
    return await index.getDocuments();
  } catch (err) {
    console.error('Erreur getLocals:', err.message);
    throw err;
  }
};

/**
 * Indexe un tableau de locaux dans Meilisearch
 * @param {Array} data - Données à indexer
 */
exports.indexLocals = async (data) => {
  try {
    return await index.addDocuments(data, { primaryKey: 'id' });
  } catch (err) {
    console.error('Erreur indexLocals:', err.message);
    throw err;
  }
};

/**
 * Recherche dans l'index 'locals' selon une requête textuelle
 * @param {string} query - Requête utilisateur
 */
exports.searchInLocals = async (query) => {
  try {
    return await index.search(query);
  } catch (err) {
    console.error('Erreur searchInLocals:', err.message);
    throw err;
  }
};
