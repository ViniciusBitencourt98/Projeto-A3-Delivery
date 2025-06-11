




const itensController = {
    // Método para criar um usuário
    restaurante: async (req, res) => {
        res.send('Rota itens restaurante funcionando!');
    },

    cliente: async (req, res) => {
        res.send('Rota itens cliente funcionando!');
    }
};

module.exports = itensController;