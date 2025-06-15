import Modal from 'react-bootstrap/Modal';
import './Modal.css';


export const ModalComponent = ({ show, onHide, children,title }) => {
  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false} centered size="lg" >
      <Modal.Header className='ModalTilte' closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  );
};

export default ModalComponent;