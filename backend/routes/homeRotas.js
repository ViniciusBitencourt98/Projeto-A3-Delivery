const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');


router.get('/restaurante', homeController.restaurante);    // GET /api/v1/home/restaurante
router.get('/cliente', homeController.cliente);    // GET /api/v1/home/cliente



module.exports = router;
