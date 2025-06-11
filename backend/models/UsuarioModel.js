const db = require('../config/database');

const UsuarioModel = {
    criarUsuario: (email, senha_hash, tipo_perfil, callback) => {
        const sql = `INSERT INTO usuarios (email, senha_hash, tipo_perfil) VALUES (?, ?, ?)`;
        db.run(sql, [email, senha_hash, tipo_perfil], function(err) {
            callback(err, this?.lastID);
        });
    },

    listarUsuarioPorId: (id, callback) => {
        const sql = `SELECT * FROM usuarios u  
        LEFT JOIN clientes c ON c.usuario_id = u.id
        LEFT JOIN restaurantes r ON r.usuario_id = u.id
        WHERE u.id = ?`;
        db.get(sql, [id], (err, row) => {
            callback(err, row);
        });
    },

    atualizarUsuario: (id, email, senha_hash, tipo_perfil, callback) => {
        const sql = `UPDATE usuarios 
                     SET email = COALESCE(?, email), 
                         senha_hash = COALESCE(?, senha_hash), 
                         tipo_perfil = COALESCE(?, tipo_perfil) 
                     WHERE id = ?`;
        db.run(sql, [email, senha_hash, tipo_perfil, id], function(err) {
            callback(err, this?.changes);
        });
    }
};

module.exports = UsuarioModel;
