// Modal.tsx
import React from 'react';
import ReactModal from 'react-modal';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  text: string | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal, text }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Extracted Text"
      ariaHideApp={false}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div className="modal-content">
        <h2>Extracted Text</h2>
        <p>{text}</p>
        <button className="close-button" onClick={closeModal}>Close Modal</button>
      </div>
    </ReactModal>
  );
};

export default Modal;
