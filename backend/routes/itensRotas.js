const express = require('express');
const router = express.Router();
const itensController = require('../controllers/itensController');


router.get('/restaurante/:id', itensController.restaurante);    // GET /api/v1/itens/restaurante/:id



router.get('/cliente/:id', itensController.cliente);    // GET /api/v1/itens/cliente/:id


       
module.exports = router;
    