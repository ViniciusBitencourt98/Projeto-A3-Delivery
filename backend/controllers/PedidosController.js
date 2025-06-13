


const PedidosController = {
    
    Criar: async (req, res) => {
        res.send('Rota pedidos criar funcionando!');
    },

    Listar: async (req, res) => {
        
        res.send(`Rota pedidos listar funcionando! ID do cliente`);
    },

    Status: async (req, res) => {
        res.send('Rota pedidos status funcionando!');
    },

    Avaliar: async (req, res) => {
        res.send('Rota pedidos avaliar funcionando!');
    }
};

module.exports = PedidosController;
