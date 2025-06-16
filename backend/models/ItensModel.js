const db = require('../config/database');

const ItensModel = {
    buscarTodosItens: (callback) => {
        const sql = `
            SELECT 
            produtos.id,
            produtos.nome,
            produtos.descricao,
            produtos.preco,
            produtos.foto_url,
            categorias_produto.nome AS categoria_nome,
            restaurantes.id AS restaurante_id
            FROM produtos
            JOIN categorias_produto ON categorias_produto.id = produtos.categoria_id
            JOIN restaurantes ON restaurantes.id = produtos.restaurante_id
            ORDER BY restaurantes.nome_fantasia, categorias_produto.nome, produtos.nome
        `;

        db.all(sql, (err, results) => {
            if (err) {
                console.error('Erro ao buscar itens:', err);
                return callback(err);
            }
            callback(null, results);
        });
    },

    ListarRestaurante: (idRestaurante, callback) => {
        const sql = 'SELECT * FROM produtos WHERE restaurante_id = ?';
        db.all(sql, [idRestaurante], (err, results) => {
            if (err) {
                console.error('Erro ao buscar itens do restaurante:', err);
                return callback(err);
            }
            callback(null, results);
        });
    },

    CriarItem: (item, callback) => {
        const sql = 'INSERT INTO produtos (nome, descricao, preco, restaurante_id, foto_url) VALUES (?, ?, ?, ?, ?)';
        db.run(sql, [item.nome, item.descricao, item.preco, item.restaurante_id, item.foto_url], function (err) {
            if (err) {
                console.error('Erro ao criar item:', err);
                return callback(err);
            }
            callback(null, { id: this.lastID });
        });
    },
    DeletaItem: (itemId, callback) => {
        const sql = 'DELETE FROM produtos WHERE id = ?';
        db.run(sql, [itemId], function (err) {
            if (err) {
                return callback(err);
            }
            callback(null);
        });
    },
    alterarItem: (itemId, itemData, callback) => {
        const sql = 'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, restaurante_id = ?, foto_url = ? WHERE id = ?';
        db.run(sql, [itemData.nome, itemData.descricao, itemData.preco, itemData.restaurante_id, itemData.foto_url, itemId], function (err) {
            if (err) {
                return callback(err);
            }
            callback(null, { id: itemId });
        });
    },
    ListaItemById: (itemId, callback) => {
        const sql = 'SELECT * FROM produtos WHERE id = ?';
        db.get(sql, [itemId], (err, item) => {
            if (err) {
                console.error('Erro ao buscar item:', err);
                return callback(err);
            }
            callback(null, item);
        });
    }
};

module.exports = ItensModel;
