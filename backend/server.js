const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./database/init'); // executa a criação e populamento do DB
const PORT = 3000;


app.use(cors());
app.use(express.json());


//Rotas de usuários, criar , alterar e listar usuários
const usuariosRotas = require('./routes/usuarios');
app.use('/api/v1/usuarios', usuariosRotas);

// Rotas de autenticação, login e logout
const autenticacaoRotas = require('./routes/autenticacao');
app.use('/api/v1/auth', autenticacaoRotas);




app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
