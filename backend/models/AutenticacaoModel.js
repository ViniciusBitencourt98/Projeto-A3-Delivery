const db = require('../config/database');

const AutenticacaoModel = {
    buscarUsuarioPorEmail: (email, callback) => {
        const sql = 'SELECT * FROM usuarios WHERE email = ?';
        db.get(sql, [email], (err, row) => {
            callback(err, row);
        });
    }
};

module.exports = AutenticacaoModel;
