const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./database/init'); // executa a criação e populamento do DB
const PORT = 3000;


app.use(cors());
app.use(express.json());


//Rotas de usuários, criar , alterar e listar usuários
const usuariosRotas = require('./routes/usuariosRotas');
app.use('/api/v1/usuarios', usuariosRotas);

// Rotas de autenticação, login e logout
const autenticacaoRotas = require('./routes/autenticacaoRotas');
app.use('/api/v1/auth', autenticacaoRotas);

// Rotas para carregar a home do cliente e restaurante
const homeRotas = require('./routes/homeRotas');
app.use('/api/v1/home', homeRotas);


// Rotas de itens, mostra os pedidos do cliente e produtos do restaurantes
const itensRotas = require('./routes/itensRotas');
app.use('/api/v1/itens', itensRotas);


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
