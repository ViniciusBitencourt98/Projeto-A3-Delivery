const AutenticacaoModel = require('../models/AutenticacaoModel');


const autenticacaoController = {
    // Método para criar um usuário
    login: async (req, res) => {
        res.send('Rota login funcionando!');
    },

    logout: async (req, res) => {
        res.send('Listar logout funcionando!');
    }
};

module.exports = autenticacaoController;
