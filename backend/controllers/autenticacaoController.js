const AutenticacaoModel = require('../models/AutenticacaoModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'seu_segredo_super_secreto'; // Trocar por process.env.JWT_SECRET no futuro

const autenticacaoController = {
    login: async (req, res) => {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
        }

        try {
            AutenticacaoModel.buscarUsuarioPorEmail(email, async (err, usuario) => {
                if (err) return res.status(500).json({ error: 'Erro ao buscar usuário.' });
                if (!usuario) return res.status(401).json({ error: 'Credenciais inválidas.' });

                const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
                if (!senhaValida) {
                    return res.status(401).json({ error: 'Credenciais inválidas.' });
                }

                const token = jwt.sign(
                    { id: usuario.id, tipo_perfil: usuario.tipo_perfil },
                    JWT_SECRET,
                    { expiresIn: '1h' }
                );

                res.status(200).json({
                    message: 'Login realizado com sucesso!',
                    token
                });
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    },

    logout: async (req, res) => {
        res.status(200).json({ message: 'Logout realizado com sucesso! (frontend deve descartar o token)' });
    }
};

module.exports = autenticacaoController;
