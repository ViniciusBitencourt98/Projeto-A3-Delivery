const express = require('express');
const router = express.Router();
const autenticacaoController = require('../controllers/autenticacaoController');


router.post('/login', autenticacaoController.login);    // POST /api/v1/auth/login
router.post('/logout', autenticacaoController.logout); // POST /api/v1/auth/logout


module.exports = router;
