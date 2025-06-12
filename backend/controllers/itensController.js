




const itensController = {
    // Método para criar um usuário
    restaurante: async (req, res) => {
        res.send('Rota itens restaurante funcionando!');
    },

    cliente: async (req, res) => {
        res.send('Rota itens cliente funcionando!');
    },

    deleteiten: async (req, res) => {
        res.send('Rota delete itens funcionando!');
    },
    AlteraIten: async (req, res) => {
        res.send('Rota altera itens funcionando!');
    }
};

module.exports = itensController;