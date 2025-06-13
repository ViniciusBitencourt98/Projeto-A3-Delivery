const express = require('express');
const router = express.Router();
const itensController = require('../controllers/itensController');

//Rota para popular home do cliente, traz todos os produtos cadastrados no sistema
router.get('/listar', itensController.Listar);                              // GET /api/v1/itens/listar


// Crud do restaurante, onde o dono do restaurante pode ler criar, alterar e deletar seus produtos

//Lista os itens do restaurante
router.get('/restaurante/listar/:id', itensController.ListarRestaurante);        // GET /api/v1/itens/restaurante/:id
//Cria um iten do restaurante
router.post('/restaurante', itensController.CriarItem);                    // POST /api/v1/itens/restaurante
//Altera um iten do restaurante
router.put('/restaurante/:id', itensController.AlteraItem);                // PUT /api/v1/itens/restaurante/:id
//Deleta um iten do restaurante
router.delete('/restaurante/:id', itensController.DeletaItem);            // DELETE /api/v1/itens/restaurante/:id
// Rota para listar item especifico do restaurante
router.get('/restaurante/produto/:id', itensController.ListaItemById);        // GET /api/v1/itens/restaurante/:id


       
module.exports = router;
    