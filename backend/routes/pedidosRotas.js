const express = require('express');
const router = express.Router();
const PedidosController = require('../controllers/pedidosController');





router.post('/', PedidosController.criar);                   // POST /api/v1/pedidos
router.post('/status/:id', PedidosController.status);       // POST /api/v1/pedidos/status
router.post('/avaliar/:id', PedidosController.avaliar);    // POST /api/v1/pedidos/avaliar




module.exports = router;