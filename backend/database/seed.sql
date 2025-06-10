--Mocando dados iniciais para o banco de dados

-- Modos de pagamento
INSERT INTO modos_pagamento (nome) VALUES ('Dinheiro'), ('Cartão de Crédito'), ('Pix');

-- Restaurantes de exemplo
INSERT INTO usuarios (email, senha_hash, tipo_perfil) VALUES 
('rest1@email.com', 'hash1', 'restaurante'),
('rest2@email.com', 'hash2', 'restaurante'),
('rest3@email.com', 'hash3', 'restaurante');

INSERT INTO restaurantes (usuario_id, nome_fantasia, cnpj, descricao, foto_url) VALUES 
(1, 'Restaurante A', '00.000.000/0001-00', 'Delícias do A', 'foto1.jpg'),
(2, 'Restaurante B', '11.111.111/0001-11', 'Sabor do B', 'foto2.jpg'),
(3, 'Restaurante C', '22.222.222/0001-22', 'Especialidades C', 'foto3.jpg');

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
