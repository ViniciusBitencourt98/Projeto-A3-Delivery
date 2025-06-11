


const homeController = {
    // Método para criar um usuário
    restaurante: async (req, res) => {
        res.send('Rota home restaurante funcionando!');
    },

    cliente: async (req, res) => {
        res.send('Rota home cliente funcionando!');
    }
};

module.exports = homeController;
