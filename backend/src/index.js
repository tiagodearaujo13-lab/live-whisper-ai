// backend/src/index.js

// 1. Importar as bibliotecas
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Carrega variáveis de ambiente (segurança)

// Importa rotas
const routes = require('./routes');
// 2. Criar o App
const app = express();

// 3. Middlewares (Configurações globais)
app.use(cors()); // Libera acesso externo
app.use(express.json()); // Permite que o servidor entenda JSON (dados estruturados)

// Rota padrão (Healh Check)
app.get('/', (req,res) => res.json({ status: "Livewhispeer API Online"}));

// Usa as rotas ofociais com prefixo '/api
app.use('/api', routes);


// 5. Iniciar o Servidor
// Tenta pegar a porta do sistema, ou usa a 3000 por padrão
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅ Servidor rodando na porta ${PORT}`);
});