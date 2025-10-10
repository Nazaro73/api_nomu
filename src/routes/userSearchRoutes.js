const express = require('express');
const router = express.Router();
const userSearchController = require('../controllers/userSearchController');

// Route pour indexer des utilisateurs
router.post('/index', userSearchController.indexUserData);

// Route pour rechercher des utilisateurs
router.get('/search', userSearchController.searchUsers);

module.exports = router;
