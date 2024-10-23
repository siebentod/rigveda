import { useEffect, useRef } from 'react';

function Modal({ showModal, onClose, children }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  }, [children]);

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        onClose();
      }
    });

    return () => {
      window.removeEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
          onClose();
        }
      });
    };
  }, []);

  if (!showModal) {
    return null;
  }

  return (
    <>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-scrollable-content">{children}</div>
      </div>
    </>
  );
}

export default Modal;
