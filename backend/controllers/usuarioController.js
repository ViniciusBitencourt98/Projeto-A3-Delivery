const UsuarioModel = require('../models/UsuarioModel');

const UsuariosController = {

    CriarUsuario: (req, res) => {
        const { email, senha_hash, tipo_perfil } = req.body;

        if (!email || !senha_hash || !tipo_perfil) {
            return res.status(400).json({ error: 'Campos obrigatórios: email, senha_hash, tipo_perfil.' });
        }

        UsuarioModel.criarUsuario(email, senha_hash, tipo_perfil, (err, lastID) => {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(409).json({ error: 'Email já cadastrado.' });
                }
                return res.status(500).json({ error: 'Erro ao criar usuário.' });
            }
            res.status(201).json({ message: 'Usuário criado com sucesso.', usuarioId: lastID });
        });
    },

    ListarUsuarioPorId: (req, res) => {
        const { id } = req.params;

        UsuarioModel.listarUsuarioPorId(id, (err, row) => {
            if (err) return res.status(500).json({ error: 'Erro ao buscar usuário.' });
            if (!row) return res.status(404).json({ error: 'Usuário não encontrado.' });

            res.status(200).json(row);
        });
    },

    AtualizarUsuario: (req, res) => {
        const { id } = req.params;
        const { email, senha_hash, tipo_perfil } = req.body;

        UsuarioModel.atualizarUsuario(id, email, senha_hash, tipo_perfil, (err, changes) => {
            if (err) return res.status(500).json({ error: 'Erro ao atualizar usuário.' });
            if (changes === 0) return res.status(404).json({ error: 'Usuário não encontrado para atualização.' });

            res.status(200).json({ message: 'Usuário atualizado com sucesso.' });
        });
    }
};

module.exports = UsuariosController;
