const UsuarioModel = require('../models/UsuarioModel');

const UsuariosController = {

    CriarUsuario: (req, res) => {
        const { email, senha_hash, tipo_perfil, endereco, perfilData } = req.body;

        if (!email || !senha_hash || !tipo_perfil || !endereco || !perfilData) {
            return res.status(400).json({ error: 'Campos obrigatórios faltando.' });
        }

        db.run("BEGIN TRANSACTION", (err) => {
            if (err) return res.status(500).json({ error: 'Erro ao iniciar transação.' });

            UsuarioModel.criarUsuario(email, senha_hash, tipo_perfil, (err, usuarioId) => {
                if (err) {
                    db.run("ROLLBACK");
                    if (err.message.includes('UNIQUE constraint failed')) {
                        return res.status(409).json({ error: 'Email já cadastrado.' });
                    }
                    return res.status(500).json({ error: 'Erro ao criar usuário.' });
                }

                UsuarioModel.criarEndereco(endereco, (err, enderecoId) => {
                    if (err) {
                        db.run("ROLLBACK");
                        return res.status(500).json({ error: 'Erro ao criar endereço.' });
                    }

                    const callbackPerfil = (err, perfilId) => {
                        if (err) {
                            db.run("ROLLBACK");
                            return res.status(500).json({ error: 'Erro ao criar perfil específico.' });
                        }

                        db.run("COMMIT", (err) => {
                            if (err) {
                                return res.status(500).json({ error: 'Erro ao finalizar transação.' });
                            }
                            res.status(201).json({
                                message: 'Usuário criado com sucesso.',
                                usuarioId,
                                enderecoId,
                                perfilId,
                                tipo_perfil
                            });
                        });
                    };

                    if (tipo_perfil === 'cliente') {
                        UsuarioModel.criarCliente(usuarioId, enderecoId, perfilData, callbackPerfil);
                    } else if (tipo_perfil === 'restaurante') {
                        UsuarioModel.criarRestaurante(usuarioId, enderecoId, perfilData, callbackPerfil);
                    } else {
                        db.run("ROLLBACK");
                        return res.status(400).json({ error: 'Tipo de perfil inválido.' });
                    }
                });
            });
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
        const { email, senha_hash, endereco, perfilData } = req.body;

        // 1. Buscar o tipo_perfil atual do usuário
        UsuarioModel.obterTipoPerfilPorId(id, (err, tipo_perfil) => {
            if (err) return res.status(500).json({ error: 'Erro ao buscar usuário.' });
            if (!tipo_perfil) return res.status(404).json({ error: 'Usuário não encontrado.' });

            // 2. Iniciar transação
            db.run("BEGIN TRANSACTION", (err) => {
                if (err) return res.status(500).json({ error: 'Erro ao iniciar transação.' });

                // 3. Atualizar tabela usuarios (sem atualizar tipo_perfil!)
                UsuarioModel.atualizarUsuario(id, { email, senha_hash }, (err) => {
                    if (err) {
                        db.run("ROLLBACK");
                        return res.status(500).json({ error: 'Erro ao atualizar usuário.' });
                    }

                    // 4. Atualizar endereço, se existir
                    const atualizarEndereco = (cb) => {
                        if (!endereco) return cb(null);
                        UsuarioModel.atualizarEndereco(endereco.id, endereco, cb);
                    };

                    // 5. Atualizar perfil específico conforme tipo_perfil
                    const atualizarPerfil = (cb) => {
                        if (!perfilData) return cb(null);

                        if (tipo_perfil === 'cliente') {
                            UsuarioModel.atualizarCliente(perfilData.id, perfilData, cb);
                        } else if (tipo_perfil === 'restaurante') {
                            UsuarioModel.atualizarRestaurante(perfilData.id, perfilData, cb);
                        } else {
                            cb(new Error('Tipo de perfil inválido'));
                        }
                    };

                    atualizarEndereco((err) => {
                        if (err) {
                            db.run("ROLLBACK");
                            return res.status(500).json({ error: 'Erro ao atualizar endereço.' });
                        }
                        atualizarPerfil((err) => {
                            if (err) {
                                db.run("ROLLBACK");
                                return res.status(500).json({ error: 'Erro ao atualizar perfil.' });
                            }

                            // 6. Commit e resposta
                            db.run("COMMIT", (err) => {
                                if (err) return res.status(500).json({ error: 'Erro ao finalizar transação.' });
                                res.status(200).json({ message: 'Usuário atualizado com sucesso.' });
                            });
                        });
                    });
                });
            });
        });
    }

};

module.exports = UsuariosController;
