import React, { useState } from 'react'
import Modal from './Modal';
  
const Support = () => {
    const[ticket,setTicket]=useState<string>("");
    const [showSupportForm, setShowSupportForm] = useState(true);
    const [showTicketNumber, setShowTicketNumber] = useState(false);
    const [modal, setModal] = useState({
        isVisible: false,
        message: '',
      });

    const handleClick=(event: React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault();

        const firstName = document.querySelector('#firstName')! as HTMLInputElement;
        const lastName = document.querySelector('#lastName')! as HTMLInputElement;
        const email = document.querySelector('#email')! as HTMLInputElement;
        const topic = document.querySelector('input[name="options"]:checked');
      
        if (((firstName.value === null || firstName.value.trim() === '')) || ((lastName.value === null || lastName.value.trim() === '')) || ((email.value === null || email.value.trim() === '') || !topic)) {
           setModal({
            isVisible: true,
            message: 'Please fill in all required fields.',
          });
          return;
        }

        if (!email.value.includes("@")) {
             setModal({
                isVisible: true,
                message: 'Please fill in the correct email format.',
              });
             return ;
        }

        let newTicket = '';

        for(var i=0; i<4; i++) {
            let num = Math.floor(Math.random() * 10);
             newTicket += num;
        }

        setTicket(newTicket);
        setShowSupportForm(false);
        setShowTicketNumber(true);
    }

    const closeModal = () => {
        setModal({
          isVisible: false,
          message: '',
        });
      };    

  return (
    <div className="support">
      <h1>Support Ticket Form</h1>

      {modal.isVisible && (
        <Modal message={modal.message} onClose={closeModal} />
      )}

      {showSupportForm && (
      <form className="supportForm" action="">
        <div className="formLeft">
            <div>
                <label htmlFor="">Name <sup>*</sup> </label> <br />
                <div className='formName'>
                    <span>
                        <input id="firstName" type="text"  /> 
                        <sub>first</sub>
                    </span>
                    <span>
                        <input id="lastName" type="text" /> 
                        <sub>last</sub>
                    </span>
                </div>
             </div>
            <div>
                <label className='fullInputWidth'>
                    <span>Email</span> <sup>*</sup><br />
                    <input id="email" type="email" />
                </label>
            </div>
            <div>
                <label>Topic <sup>*</sup></label> <br />
                <div className="checkboxes">
                    <p>What can we help you today</p>
                    
                    <label >
                        <input type="radio" name="options" value="option1"/>
                        General
                    </label>
                    <br />

                    <label >
                        <input type="radio" name="options" value="option2"/>
                        Bug
                    </label>

                </div>
             </div>
        </div>

        <div className="formRight">
            <label htmlFor="">Description <sup>optional</sup> </label>  <br />

            <textarea name="" id=""  rows={15} cols={25} ></textarea>
            <button className='sendButton' onClick={handleClick}>SEND</button>
        </div>
      </form>  )}


      {showTicketNumber && (
      <div className='ticketNumber'>
        <h2>Thank you for sending us your report, we will track the problem now</h2>
        <p>ticket number: {ticket}</p>
      </div> )}

    </div>
  )
}

export default Support
