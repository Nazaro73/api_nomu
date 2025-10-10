const express = require('express');
const router = express.Router();
const localsController = require('../controllers/localsController');

// Route pour récupérer tous les locaux
router.get('/', localsController.getAllLocals);

// Route pour indexer des locaux
router.post('/', localsController.addLocals);

// Route pour rechercher des locaux
router.get('/search', localsController.searchLocals);

module.exports = router;
