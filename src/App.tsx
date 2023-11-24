import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css'; //import css
import DigitButton from './components/DigitButton';
import OperatorButton from './components/OperatorButton';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Support from './components/Support';

//rafce
const App= ()=> {
  const [result,setResult]=useState<string>("0");
  const [operator,setOperator]=useState<string>("");
  const [history, setHistory] = useState<Array<string>>([]);

  const addInput = (value:string) => {
      if(result=="0"){
        setResult(`${value}`);
       }else{
        setResult(`${result}${value}`);
      }
  };

  const addOperator= (value:string) => {
    if(operator==null || operator=="") {
      setOperator(`${value}`);
      setResult(`${result}${value}`);
    }
  }

  const del=()=>{
    if(result=="0"){
      return;
    }

    const newResult = result.slice(0, -1);
    setResult(newResult);

    if (operator === result.slice(-1)) {
      setOperator("");
    }

    if (newResult === "") {
      setResult("0");
    }
  }

  const clear= ()=>{
    setResult('0');
    setOperator('');
  }

  const calculate = () => {  
    let parts: string[];
    let operand1: number;
    let operand2: number;  

    parts= result.split(operator);
    operand1=parseInt(parts[0]);
    operand2=parseInt(parts[1]);

    if(isNaN(operand1)|| !operator ||isNaN(operand2)){
      //give an err message
      setResult("Err");
    return;
  }


   
    switch (operator) {
      case '+':
        setResult(`${operand1 + operand2}`);
        setHistory([...history, `${operand1 + operand2}`]);

        break;
      case '-':
        setResult(`${operand1 - operand2}`);
        setHistory([...history, `${operand1 - operand2}`]);
        break;
      case 'x':
         setResult(`${operand1 * operand2}`);
         setHistory([...history, `${operand1 * operand2}`]);

        break;
      case '/':
         if (operand2 !== 0) {
          setHistory([...history, `${operand1 / operand2}`]);
          setResult(`${operand1 / operand2}`);
        } else {
           setResult("Err");
        }
        break;
      default:
         break;
    }
      setOperator("");
  };

  return (
    <div className="calculator">
      <div className="output">
        <div className="historyList">
          {history.map((item, index) => (
              <li key={index}>{item}</li>
          ))}
        </div>
        <div className="result">
        {result}
        </div>
      </div>
      <div className="calculator-buttons">
        <OperatorButton addOperator={addOperator} operator={"C"} clear={clear}></OperatorButton>
        <OperatorButton addOperator={addOperator} operator={"DEL"} del={del}></OperatorButton>
        <OperatorButton className="supportPage" support addOperator={addOperator} operator={"?"}></OperatorButton>
        <OperatorButton className="rightButton" addOperator={addOperator} operator={"/"}></OperatorButton>

        <DigitButton digit={"1"} addInput={addInput}></DigitButton>
        <DigitButton digit={"2"} addInput={addInput}></DigitButton>
        <DigitButton digit={"3"} addInput={addInput}></DigitButton>
        <OperatorButton className="rightButton" addOperator={addOperator} operator={"x"}></OperatorButton>

        <DigitButton digit={"4"} addInput={addInput}></DigitButton>
        <DigitButton digit={"5"} addInput={addInput}></DigitButton>
        <DigitButton digit={"6"} addInput={addInput}></DigitButton>
        <OperatorButton className="rightButton" addOperator={addOperator} operator={"-"}></OperatorButton>

        <DigitButton digit={"7"} addInput={addInput}></DigitButton>
        <DigitButton digit={"8"} addInput={addInput}></DigitButton>
        <DigitButton digit={"9"} addInput={addInput}></DigitButton>
        <OperatorButton className="rightButton" addOperator={addOperator} operator={"+"}></OperatorButton>

        <DigitButton className="lastButton" digit={"0"} addInput={addInput} ></DigitButton>
        <OperatorButton className="lastButton" addOperator={addOperator} operator={"="} calculate={calculate}></OperatorButton>

      </div>

      <p className="note">Note: result history can be scrolled!</p>
    </div>
  );
}

const MainApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </Router>
  );
};

export default MainApp;

