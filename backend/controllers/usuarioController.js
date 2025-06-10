const UserModel = require('../models/Usuario');


const usuarioController = {
    // Método para criar um usuário
    CriarUsuario: async (req, res) => {
        res.send('Usuário criado!');
    },

    ListarUsuario: async (req, res) =>{
        res.send('ListarUsuario funcionando!');
    }
};

module.exports = usuarioController;
