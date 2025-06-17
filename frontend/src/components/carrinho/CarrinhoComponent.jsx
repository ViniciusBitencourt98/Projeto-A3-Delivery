import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';
import { Row, Col, Button, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import './CarrinhoComponet.css';

const CartComponent = () => {
  const { cartItems, removeFromCart, isCartVisible, cartRestaurantId, clearCart, closeCart } = useCart();
  const { user } = useUser();
  const deliveryFee = 2.5;

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const total = subtotal + deliveryFee;

  const [modoPagamento, setModoPagamento] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCartVisible) return null;

  const handleComprar = async () => {
    if (!modoPagamento) {
      alert('Por favor, selecione uma forma de pagamento.');
      return;
    }
    if (cartItems.length === 0) {
      alert('Seu carrinho está vazio.');
      return;
    }

    if (!user || !user.id) {
      alert('Usuário não está logado.');
      return;
    }

    const body = {
      usuario_id: user.id,
      restaurante_id: cartRestaurantId,
      modo_pagamento_id: modoPagamento,
      itens: cartItems.map(item => ({
        produto_id: item.id,
        quantidade: item.quantity,
        preco_unitario: item.price
      }))
    };
    try {
      setIsSubmitting(true);

      const response = await fetch('http://localhost:3001/api/v1/pedidos/cliente/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });
      

      if (!response.ok) {
        const errorData = await response.json();
        alert('Erro ao fazer pedido: ' + (errorData.message || response.statusText));
        setIsSubmitting(false);
        return;
      }

      alert('Pedido realizado com sucesso!');
      clearCart();
      closeCart();

    } catch (error) {
      alert('Erro na comunicação com o servidor: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="cart-container p-3 bg-white shadow-sm rounded">
      <h5 className="text-white bg-success p-2 rounded">Meu carrinho</h5>
      {cartItems.length === 0 ? (
        <p className="text-center mt-3">Seu carrinho está vazio.</p>
      ) : (
        cartItems.map(item => (
          <Row key={item.id} className="align-items-center my-2 border-bottom pb-2">
            <Col xs={2}><span>{item.quantity}x</span></Col>
            <Col xs={7}>
              <strong>R${item.price.toFixed(2)}</strong><br />
              <small>{item.name}</small><br />
              <small>{item.details}</small>
            </Col>
            <Col xs={2}>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFromCart(item.id)}
              >x</Button>
            </Col>
          </Row>
        ))
      )}

      <Row className="mt-3">
        <Col>Sub Total:</Col>
        <Col className="text-end">R${subtotal.toFixed(2)}</Col>
      </Row>
      <Row>
        <Col>Entrega:</Col>
        <Col className="text-end">R${deliveryFee.toFixed(2)}</Col>
      </Row>
      <hr />
      <Row>
        <Col><strong>Total:</strong></Col>
        <Col className="text-end"><strong>R${total.toFixed(2)}</strong></Col>
      </Row>

      <Form className="mt-3">
        <Form.Label><strong>Forma de pagamento:</strong></Form.Label>
        <div className="d-flex gap-3">
          <Form.Check
            type="radio"
            label="Cartão"
            name="pagamento"
            value="2"
            checked={modoPagamento === '2'}
            onChange={() => setModoPagamento('2')}
          />
          <Form.Check
            type="radio"
            label="PIX"
            name="pagamento"
            value="3"
            checked={modoPagamento === '3'}
            onChange={() => setModoPagamento('3')}
          />
          <Form.Check
            type="radio"
            label="Dinheiro"
            name="pagamento"
            value="1"
            checked={modoPagamento === '1'}
            onChange={() => setModoPagamento('1')}
          />
        </div>
      </Form>

      <Button
        className="mt-3 w-100 bg-success border-0"
        onClick={handleComprar}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Enviando...' : 'Comprar!'}
      </Button>
    </div>
  );
};

export default CartComponent;
