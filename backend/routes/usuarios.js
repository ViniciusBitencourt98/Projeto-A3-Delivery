const express = require('express');
const router = express.Router();
const UsuariosController = require('../controllers/usuarioController');


// Rota para criar um usuário
router.post('/', UsuariosController.CriarUsuario);

// Rota para listar usuários
router.get('/', UsuariosController.ListarUsuario);

module.exports = router;
