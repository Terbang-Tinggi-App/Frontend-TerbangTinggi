/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-no-bind */
import ReactModal from 'react-modal';

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

export function Modal({ isOpen, children, closeModal, label, className }) {
  return (
    <ReactModal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      className={`modal-box relative ${className}`}
      contentLabel={label || 'Example'}>
      {children}
    </ReactModal>
  );
}
