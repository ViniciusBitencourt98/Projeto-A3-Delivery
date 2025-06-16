const express = require('express');
const router = express.Router();
const PedidosController = require('../controllers/pedidosController');



// Rota para listar os pedidos do cliente
router.post('/cliente/listar/:id', PedidosController.Listar);          // GET /api/v1/pedidos/cliente/listar/:id
//Rota para crioar um pedido
router.post('/cliente/', PedidosController.CriarPedido);                   // POST /api/v1/pedidos/cliente/
//Rota para o cliente avaliar um pedido
router.post('/cliente/avaliar/:id', PedidosController.Avaliar);      // POST /api/v1/pedidos/avaliar/:id

// Rota para o restaurante mudar o status do pedido
router.post('/restaurante/status/:id', PedidosController.Status);    // POST /api/v1/pedidos/restaurante/status/:id





module.exports = router;