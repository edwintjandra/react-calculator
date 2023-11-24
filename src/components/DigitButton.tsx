import React from 'react'

export interface IDigitButton {
    digit:string;
    className?: string; 
    addInput:(value:string)=>void;
 }

const DigitButton = (props:IDigitButton) => {
  const buttonClass:string=`digitButton ${props.className || ''}`;

  return (
    <button className={buttonClass} onClick={
        ()=>{
           props.addInput(props.digit);
        }
    }>
         {props.digit}
    </button>
  )
}

export default DigitButton
