import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function RegisterModal({ show, onHide }) {
  const [step, setStep] = useState(1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Form.Group>
              <Form.Label>Tipo de Perfil</Form.Label>
              <Form.Check type="radio" label="Cliente" name="perfil" id="cliente" />
              <Form.Check type="radio" label="Restaurante" name="perfil" id="restaurante" />
            </Form.Group>
          </>
        );
      case 2:
        return (
          <>
            <Form.Group>
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Campo específico</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </>
        );
      case 3:
        return (
          <>
            <Form.Group>
              <Form.Label>Endereço</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Registrar-se</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>{renderStep()}</Form>
      </Modal.Body>
      <Modal.Footer>
        {step > 1 && (
          <Button variant="secondary" onClick={() => setStep(step - 1)}>
            Voltar
          </Button>
        )}
        {step < 3 ? (
          <Button variant="primary" onClick={() => setStep(step + 1)}>
            Próximo
          </Button>
        ) : (
          <Button variant="success" onClick={() => alert('Enviar formulário')}>
            Finalizar
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
