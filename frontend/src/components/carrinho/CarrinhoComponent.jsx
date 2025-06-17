import { useCart } from '../../context/CartContext';
import { Row, Col, Button, Form } from 'react-bootstrap';
import './CarrinhoComponet.css';

const CartComponent = () => {
  const { cartItems, removeFromCart } = useCart();
  const deliveryFee = 2.5;

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const total = subtotal + deliveryFee;

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
          <Form.Check type="radio" label="Cartão" name="pagamento" />
          <Form.Check type="radio" label="PIX" name="pagamento" />
          <Form.Check type="radio" label="Dinheiro" name="pagamento" />
        </div>
      </Form>

      <Button className="mt-3 w-100 bg-success border-0">Comprar!</Button>
    </div>
  );
};

export default CartComponent;
