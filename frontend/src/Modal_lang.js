import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  height: '40%',
  width: '30%',
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
};

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1000,
};

function Modal_lang({ children, onClose }) {
  // useEffect(() => {
  //   loadGoogleTranslate();
  // }, [loadGoogleTranslate]);

  return ReactDOM.createPortal(
    <>
      {/* Overlay */}
      <div style={OVERLAY_STYLES} onClick={onClose} />
      {/* Modal content */}
      <div style={MODAL_STYLES}>
        <button onClick={onClose} style={{ position: "absolute", right: 0, top: 0, zIndex: 9999 }}>
          Close
        </button>
        {children}
      </div>
    </>,
    document.getElementById('modal-root')
  );
}

export default Modal_lang;