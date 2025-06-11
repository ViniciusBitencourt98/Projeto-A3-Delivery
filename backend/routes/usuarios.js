const express = require('express');
const router = express.Router();
const UsuariosController = require('../controllers/usuarioController');


router.post('/', UsuariosController.CriarUsuario);        // POST /api/v1/usuarios
router.get('/:id', UsuariosController.ListarUsuarioPorId); // GET /api/v1/usuarios/:id
router.put('/:id', UsuariosController.AtualizarUsuario);   // PUT /api/v1/usuarios/:id

module.exports = router;
