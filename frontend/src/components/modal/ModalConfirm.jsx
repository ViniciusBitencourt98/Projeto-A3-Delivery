import Modal from 'react-bootstrap/Modal';
import './Modal.css';

export const ModalConfirm = ({ show, onHide, children, variant }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={false}
      centered
      size="lg"
      className={`modal-${variant}`} // 👈 classe dinâmica baseada na prop
    >
      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  );
};

export default ModalConfirm;
