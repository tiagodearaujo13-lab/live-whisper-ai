// backend/src/routes.js
const express = require('express');
const router = express.Router();

// Importa nosso controlador
const aiController = require('./controllers/aiController');

// Define a rota POST (porque estamos ENVIANDO dados)
// Quando alguém chamar "localhost:3000/api/suggestion", roda a função getSuggestion
router.post('/suggestion', aiController.getSuggestion);

module.exports = router;