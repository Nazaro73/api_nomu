const { indexUsers, searchInUsers } = require('../services/meiliUserService');

/**
 * Indexe des utilisateurs dans Meilisearch
 */
exports.indexUserData = async (req, res) => {
  try {
    const response = await indexUsers(req.body);
    res.status(200).json(response);
  } catch (error) {
    console.error('Erreur indexUserData:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Recherche des utilisateurs dans Meilisearch
 */
exports.searchUsers = async (req, res) => {
  try {
    const query = req.query.q || '';
    const results = await searchInUsers(query);
    res.status(200).json(results);
  } catch (error) {
    console.error('Erreur searchUsers:', error);
    res.status(500).json({ error: error.message });
  }
};
