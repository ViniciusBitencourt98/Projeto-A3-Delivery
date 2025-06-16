const db = require('../config/database');

const UsuarioModel = {
    criarUsuario: (email, senha_hash, tipo_perfil, callback) => {
        const sql = `INSERT INTO usuarios (email, senha_hash, tipo_perfil) VALUES (?, ?, ?)`;
        db.run(sql, [email, senha_hash, tipo_perfil], function (err) {
            callback(err, this?.lastID, email, senha_hash);
        });
    },

    criarEndereco: (endereco, callback) => {
        const sql = `INSERT INTO enderecos (cep, logradouro, numero, complemento, bairro) VALUES (?, ?, ?, ?, ?)`;
        const { cep, logradouro, numero, complemento, bairro } = endereco;
        db.run(sql, [cep, logradouro, numero, complemento, bairro], function (err) {
            callback(err, this?.lastID);
        });
    },

    criarCliente: (usuarioId, enderecoId, perfilData, callback) => {
        const { nome, telefone } = perfilData;
        const sql = `INSERT INTO clientes (usuario_id, nome, telefone, endereco_id) VALUES (?, ?, ?, ?)`;
        db.run(sql, [usuarioId, nome, telefone, enderecoId], function (err) {
            callback(err, this?.lastID);
        });
    },

    criarRestaurante: (usuarioId, enderecoId, perfilData, callback) => {
        const { nome_fantasia, preco_frete, foto_url } = perfilData;
        const sql = `INSERT INTO restaurantes (usuario_id, nome_fantasia, preco_frete, foto_url, endereco_id) VALUES (?, ?, ?, ?, ?)`;
        db.run(sql, [usuarioId, nome_fantasia, preco_frete, foto_url, enderecoId], function (err) {
            callback(err, this?.lastID);
        });
    },

    listarUsuarioPorId: (id, callback) => {
        const sql = `SELECT * FROM usuarios u  
        LEFT JOIN clientes c ON c.usuario_id = u.id
        LEFT JOIN restaurantes r ON r.usuario_id = u.id
        LEFT JOIN enderecos e ON e.id = COALESCE(c.endereco_id, r.endereco_id)
        WHERE u.id = ?`;
        db.get(sql, [id], (err, row) => {
            callback(err, row);
        });
    },

    // Atualiza apenas email e senha_hash (tipo_perfil não pode ser alterado)
    atualizarUsuario: (id, usuarioData, callback) => {
        const { email, senha_hash } = usuarioData;
        const sql = `UPDATE usuarios 
                     SET email = COALESCE(?, email), 
                         senha_hash = COALESCE(?, senha_hash)
                     WHERE id = ?`;
        db.run(sql, [email, senha_hash, id], function (err) {
            callback(err, this?.changes);
        });
    },

    // Atualiza endereço específico
    atualizarEndereco: (enderecoId, enderecoData, callback) => {
        const { cep, logradouro, numero, complemento, bairro } = enderecoData;
        const sql = `UPDATE enderecos 
                     SET cep = COALESCE(?, cep),
                         logradouro = COALESCE(?, logradouro),
                         numero = COALESCE(?, numero),
                         complemento = COALESCE(?, complemento),
                         bairro = COALESCE(?, bairro)
                     WHERE id = ?`;
        db.run(sql, [cep, logradouro, numero, complemento, bairro, enderecoId], function (err) {
            callback(err, this?.changes);
        });
    },

    // Atualiza dados de cliente
    atualizarCliente: (clienteId, clienteData, callback) => {
        const { nome, telefone } = clienteData;
        const sql = `UPDATE clientes 
                     SET nome = COALESCE(?, nome),
                         telefone = COALESCE(?, telefone)
                     WHERE id = ?`;
        db.run(sql, [nome, telefone, clienteId], function (err) {
            callback(err, this?.changes);
        });
    },

    // Atualiza dados de restaurante
    atualizarRestaurante: (restauranteId, restauranteData, callback) => {
        const { nome_fantasia, preco_frete, foto_url } = restauranteData;
        const sql = `UPDATE restaurantes 
                     SET nome_fantasia = COALESCE(?, nome_fantasia),
                         preco_frete = COALESCE(?, preco_frete),
                         foto_url = COALESCE(?, foto_url)
                     WHERE id = ?`;
        db.run(sql, [nome_fantasia, preco_frete, foto_url, restauranteId], function (err) {
            callback(err, this?.changes);
        });
    },

    obterTipoPerfilPorId: (id, callback) => {
        const sql = "SELECT tipo_perfil FROM usuarios WHERE id = ?";
        db.get(sql, [id], (err, row) => {
            if (err) return callback(err);
            if (!row) return callback(null, null);
            callback(null, row.tipo_perfil);
        });
    }
};

module.exports = UsuarioModel;
