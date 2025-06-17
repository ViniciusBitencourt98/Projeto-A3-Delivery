-- Mocando dados iniciais para o banco de dados

-- Modos de pagamento
INSERT INTO modos_pagamento (nome) VALUES ('Dinheiro'), ('Cartão de Crédito'), ('Pix');

-- Usuários restaurantes (com senha hash gerada via bcrypt para "senha123")
INSERT INTO usuarios (email, senha_hash, tipo_perfil) VALUES 
('rest1@email.com', '$2a$10$GJ2MX1OPdHhLpz6MVO1MAehDT2Edfp/g6EyEq9qLkL0BBAmZ4OvG6', 'restaurante'),
('rest2@email.com', '$2a$10$GJ2MX1OPdHhLpz6MVO1MAehDT2Edfp/g6EyEq9qLkL0BBAmZ4OvG6', 'restaurante'),
('rest3@email.com', '$2a$10$GJ2MX1OPdHhLpz6MVO1MAehDT2Edfp/g6EyEq9qLkL0BBAmZ4OvG6', 'restaurante');

-- Restaurantes de exemplo
INSERT INTO restaurantes (usuario_id, nome_fantasia, foto_url, preco_frete) VALUES 
(1, 'Restaurante A', 'foto1.jpg', 9.99),
(2, 'Restaurante B', 'foto2.jpg', 10.99),
(3, 'Restaurante C', 'foto3.jpg', 7.99);

--Tipos de produto
INSERT INTO categorias_produto (nome) VALUES 
('Hamburguer'), 
('Pizza'), 
('Suco'),
('Batata');

-- Produtos de exemplo
INSERT INTO produtos (restaurante_id, categoria_id, nome, descricao, preco, foto_url) VALUES
(1, 1, 'Hamburguer A', 'Delicioso hamburguer A', 20.50, 'hamburguer.png'),
(1, 2, 'Pizza A', 'Saborosa pizza A', 35.00, 'pizza.png'),
(1, 3, 'Suco A', 'Suco natural A', 8.00, 'suco.png'),
(2, 1, 'Hamburguer B', 'Delicioso hamburguer B', 21.00, 'hamburguer.png'),
(2, 2, 'Pizza B', 'Saborosa pizza B', 36.00, 'pizza.png'),
(2, 3, 'Suco B', 'Suco natural B', 9.00, 'suco.png'),
(3, 1, 'Hamburguer C', 'Delicioso hamburguer C', 22.00, 'hamburguer.png'),
(3, 2, 'Pizza C', 'Saborosa pizza C', 37.00, 'pizza.png'),
(3, 3, 'Suco C', 'Suco natural C', 10.00, 'suco.png'),
(3, 4, 'Batata C', 'Batata frita crocante C', 12.00, 'batata.png');