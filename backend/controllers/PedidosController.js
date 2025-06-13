const PedidosModel = require('../models/PedidosModel');
const db = require('../config/database');


const PedidosController = {

    CriarPedido: (req, res) => {
        const { usuario_id, restaurante_id, modo_pagamento_id, itens } = req.body;

        if (!usuario_id || !restaurante_id || !modo_pagamento_id || !itens || !Array.isArray(itens) || itens.length === 0) {
            return res.status(400).json({ error: 'Dados incompletos ou inválidos para criar o pedido.' });
        }

        db.run("BEGIN TRANSACTION", (err) => {
            if (err) return res.status(500).json({ error: 'Erro ao iniciar transação.' });

            PedidosModel.criarPedido({ usuario_id, restaurante_id, modo_pagamento_id }, (err, pedidoId) => {
                if (err) {
                    db.run("ROLLBACK");
                    return res.status(500).json({ error: 'Erro ao criar pedido.' });
                }

                PedidosModel.inserirItensPedido(pedidoId, itens, (err) => {
                    if (err) {
                        db.run("ROLLBACK");
                        return res.status(500).json({ error: 'Erro ao inserir itens do pedido.' });
                    }

                    db.run("COMMIT", (err) => {
                        if (err) {
                            return res.status(500).json({ error: 'Erro ao finalizar transação.' });
                        }
                        res.status(201).json({ message: 'Pedido criado com sucesso.', pedidoId });
                    });
                });
            });
        });
    },

    Listar: async (req, res) => {
        const { filtroCampo } = req.body;
        const filtroValor = req.params.id;

        const camposPermitidos = ['usuario_id', 'restaurante_id'];
        if (!camposPermitidos.includes(filtroCampo)) {
            return res.status(400).json({ error: 'Campo de filtro inválido.' });
        }

        PedidosModel.ListarPedidosPorFiltro(filtroCampo, filtroValor, (err, pedidos) => {
            if (err) {
                return res.status(500).send('Erro ao buscar pedidos.');
            }
            if (!pedidos || pedidos.length === 0) {
                return res.status(200).json({ message: 'Nenhum pedido encontrado.', data: [] });
            }
            res.status(200).json(pedidos);
        });
    },

    Status: async (req, res) => {
        const id = req.params.id;
        const { status } = req.body;

        
        const statusPermitidos = ['pendente', 'confirmado', 'preparando', 'entregue', 'cancelado'];
        if (!status || !statusPermitidos.includes(status.toLowerCase())) {
            return res.status(400).json({ error: 'Status inválido ou não informado.' });
        }

        PedidosModel.atualizarStatusPedido(id, status, (err) => {
            if (err) {
                console.error('Erro ao atualizar status do pedido:', err);
                return res.status(500).json({ error: 'Erro ao atualizar status do pedido.' });
            }
            res.status(200).json({ message: 'Status do pedido atualizado com sucesso.' });
        });
    },

    Avaliar: async (req, res) => {
        const pedido_id = req.params.id;
        const { nota } = req.body;

        if (!nota || nota < 1 || nota > 5) {
            return res.status(400).json({ error: 'Nota inválida. Deve ser entre 1 e 5.' });
        }

        PedidosModel.InserirAvaliacao({ pedido_id, nota }, (err) => {
            if (err) {
                console.error('Erro ao inserir avaliação:', err);
                return res.status(500).send('Erro ao inserir avaliação');
            }
            res.status(201).json({ message: 'Avaliação registrada com sucesso!' });
        });
    }
};

module.exports = PedidosController;
