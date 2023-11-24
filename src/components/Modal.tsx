import React from 'react'

interface IModalProps {
    message: string;
    onClose: () => void;
  }

const Modal = (props:IModalProps) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className='warningModal'>
          warning!
        </div>
        <div>
          <p>{props.message}</p>
          <button onClick={props.onClose}>Close</button>
        </div>
       
      </div>
    </div>
  )
}

export default Modal
