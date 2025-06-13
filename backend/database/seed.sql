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

-- Produtos de exemplo
INSERT INTO produtos (restaurante_id, nome, descricao, preco, foto_url) VALUES
(1, 'Hamburguer A', 'Delicioso hamburguer A', 20.50, 'hamburguerA.jpg'),
(1, 'Pizza A', 'Saborosa pizza A', 35.00, 'pizzaA.jpg'),
(1, 'Suco A', 'Suco natural A', 8.00, 'sucoA.jpg'),
(2, 'Hamburguer B', 'Delicioso hamburguer B', 21.00, 'hamburguerB.jpg'),
(2, 'Pizza B', 'Saborosa pizza B', 36.00, 'pizzaB.jpg'),
(2, 'Suco B', 'Suco natural B', 9.00, 'sucoB.jpg'),
(3, 'Hamburguer C', 'Delicioso hamburguer C', 22.00, 'hamburguerC.jpg'),
(3, 'Pizza C', 'Saborosa pizza C', 37.00, 'pizzaC.jpg'),
(3, 'Suco C', 'Suco natural C', 10.00, 'sucoC.jpg'),
(3, 'Batata C', 'Batata frita crocante C', 12.00, 'batataC.jpg');
