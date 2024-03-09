import React from 'react'
import ReactDom from 'react-dom'

const MODAL_STYLES = {//css
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  height: '40%',
  width: '30%'
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}

export default function Modal({ children, onClose }) {
  //ye ek alag div me display hoga not root
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <button
          className='btn text-white fs-5' // Remove 'bg-danger' and add 'text-white' for white text
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            zIndex: 9999,
            padding: "7px 12px",
            background: "transparent", // Make the background transparent
            border: "none", // Remove border if any
            boxShadow: 'none'
          }}
          onClick={onClose}
        >
          X
        </button>

        {children}
      </div>
    </>,
    document.getElementById('edit-root')
  )
}