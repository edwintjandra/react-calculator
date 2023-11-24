import React from 'react';
import { useNavigate } from 'react-router-dom';



export interface IOperatorButton {
    operator:string;
    className?: string; 
    addOperator:(value:string)=>void;
    clear?: () => void;
    del?: ()=>void;
    calculate?: ()=>void;
    support?: boolean;
}

const OperatorButton = (props:IOperatorButton) => {
    const buttonClass:string=`operatorButton ${props.className || ''}`;
    const navigate = useNavigate();

    const handleClick = () => {
        if (props.clear) {
          props.clear();
        } else if(props.del) {
            props.del();
        } else if(props.calculate) {
            props.calculate();
        } else if(props.support){
            navigate('/support');
        } 
        else {
          props.addOperator(props.operator);
        }
      };

  return (
    <button className={buttonClass} onClick={handleClick}>
        {props.operator}
    </button>
  )
}

export default OperatorButton
