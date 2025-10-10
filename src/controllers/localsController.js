const { indexLocals, searchInLocals, getLocals } = require('../services/meiliService');

/**
 * Récupère tous les locaux depuis Meilisearch
 */
exports.getAllLocals = async (req, res) => {
  try {
    const results = await getLocals();
    res.status(200).json(results);
  } catch (error) {
    console.error('Erreur getAllLocals:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des locaux' });
  }
};

/**
 * Indexe des locaux dans Meilisearch
 */
exports.addLocals = async (req, res) => {
  try {
    const response = await indexLocals(req.body);
    res.status(200).json(response);
  } catch (error) {
    console.error('Erreur addLocals:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Recherche des locaux dans Meilisearch
 */
exports.searchLocals = async (req, res) => {
  try {
    const query = req.query.q || '';
    const results = await searchInLocals(query);
    res.status(200).json(results);
  } catch (error) {
    console.error('Erreur searchLocals:', error);
    res.status(500).json({ error: error.message });
  }
};
