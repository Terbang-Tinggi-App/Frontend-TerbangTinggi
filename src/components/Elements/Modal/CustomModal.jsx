/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-no-bind */
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

export function CustomModal({ isOpen, children, closeModal, label, className }) {
  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      className={`modal-box relative ${className}`}
      contentLabel={label ?? 'Example'}>
      {children}
    </Modal>
  );
}
