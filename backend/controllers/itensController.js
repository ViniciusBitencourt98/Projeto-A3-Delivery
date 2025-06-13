const ItensModel = require('../models/ItensModel');


const itensController = {

    Listar: async (req, res) => {
        ItensModel.buscarTodosItens((err, itens) => {
            if (err) {
                console.error('Erro ao buscar itens:', err);
                return res.status(500).send('Erro ao buscar itens');
            }
            res.status(200).json(itens);
        });
    },

    ListarRestaurante: async (req, res) => {
        ItensModel.ListarRestaurante(req.params.id, (err, itens) => {
            if (err) {
                return res.status(500).send('Erro ao buscar itens do restaurante');
            }
            res.status(200).json(itens);
        });
    },

    CriarItem: async (req, res) => {
        ItensModel.CriarItem(req.body, (err, novoItem) => {
            if (err) {
                console.error('Erro ao criar item:', err);
                return res.status(500).send('Erro ao criar item');
            }
            res.status(201).json(novoItem);
        })
    },

    DeletaItem: async (req, res) => {
        const itemId = req.params.id;
        ItensModel.DeletaItem(itemId, (err) => {
            if (err) {
                return res.status(500).send('Erro ao deletar item');
            }
        });
        res.status(204).send();
    },
    AlteraItem: async (req, res) => {
        const itemId = req.params.id;
        const itemData = req.body;

        ItensModel.alterarItem(itemId, itemData, (err) => {
            if (err) {
                return res.status(500).send('Erro ao alterar item');
            }
            res.status(200).json({ message: 'Item alterado com sucesso!' });
        });
    },
    ListaItemById: async (req, res) => {
        const itemId = req.params.id;
        ItensModel.ListaItemById(itemId, (err, item) => {
            if (err) {
                return res.status(500).send('Erro ao buscar item');
            }
            if (!item || item.length === 0) {
                return res.status(404).send('Item não encontrado');
            }
            res.status(200).json(item);
        });
    }
};

module.exports = itensController;