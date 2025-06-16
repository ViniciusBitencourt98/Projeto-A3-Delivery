const db = require('../config/database');

const PedidosModel = {

    criarPedido: ({ usuario_id, restaurante_id, modo_pagamento_id }, callback) => {
        const sql = `
            INSERT INTO pedidos (usuario_id, restaurante_id, modo_pagamento_id)
            VALUES (?, ?, ?)
        `;
        db.run(sql, [usuario_id, restaurante_id, modo_pagamento_id], function (err) {
            if (err) return callback(err);
            callback(null, this.lastID); // Retorna o ID do novo pedido
        });
    },

    inserirItensPedido: (pedidoId, itens, callback) => {
        const sql = `
            INSERT INTO pedido_itens (pedido_id, produto_id, quantidade, preco_unitario)
            VALUES (?, ?, ?, ?)
        `;
        const stmt = db.prepare(sql);

        for (const item of itens) {
            stmt.run([pedidoId, item.produto_id, item.quantidade, item.preco_unitario], (err) => {
                if (err) return callback(err);
            });
        }

        stmt.finalize(callback); // Finaliza statement após inserção de todos
    },

    ListarPedidosPorFiltro: (campo, valor, callback) => {
        const sql = `
        SELECT 
            pedidos.id as pedido_id,
            pedidos.status,
            SUM(pedido_itens.quantidade * pedido_itens.preco_unitario) AS valor_total,
            GROUP_CONCAT(produtos.nome, ', ') AS itens_nome
        FROM pedidos
        JOIN pedido_itens ON pedido_itens.pedido_id = pedidos.id
        JOIN produtos ON produtos.id = pedido_itens.produto_id
        LEFT JOIN modos_pagamento ON modos_pagamento.id = pedidos.modo_pagamento_id
        WHERE ${campo} = ?
        GROUP BY pedidos.id
        ORDER BY pedidos.criado_em DESC`;

        db.all(sql, [valor], (err, results) => {
            if (err) {
                console.error('Erro ao buscar pedidos:', err);
                return callback(err);
            }
            callback(null, results);
        });
    },

    InserirAvaliacao: (avaliacao, callback) => {
        const sql = 'INSERT INTO avaliacoes (pedido_id, nota) VALUES (?, ?)';
        db.run(sql, [avaliacao.pedido_id, avaliacao.nota], function (err) {
            if (err) {
                console.error('Erro ao inserir avaliação:', err);
                return callback(err);
            }
            callback(null);
        });
    },

    atualizarStatusPedido: (id, status, callback) => {
        const sql = `UPDATE pedidos SET status = ? WHERE id = ?`;
        db.run(sql, [status, id], function (err) {
            if (err) {
                return callback(err);
            }
            if (this.changes === 0) {
                return callback(new Error('Pedido não encontrado'));
            }
            callback(null);
        });
    }

};



module.exports = PedidosModel;