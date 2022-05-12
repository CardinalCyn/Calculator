import './App.css';
import React, {useState} from 'react';
import CalculatorButtons from './Components/calculatorButtons';
import {flushSync} from "react-dom";
//used for evaluating the final expression, thru math.evaluate
const math= require('mathjs');

const App=()=> {
  //collection of button ids, labels on the buttons, and their types
  const buttonsNames=[
    {name:"clear", label:"AC", type:"nothing"},
    {name:"power", label:"^", type:"operator"},
    {name:"remainder",label:"%", type:"operator"},
    {name:"divide", label:"/", type:"operator"},
    {name:"seven", label:"7", type:"digit"},
    {name:"eight", label:"8", type:"digit"},
    {name:"nine", label:"9", type:"digit"},
    {name:"multiply", label:"*", type:"operator"},
    {name:"four", label:"4", type:"digit"},
    {name:"five", label:"5", type:"digit"},
    {name:"six", label:"6", type:"digit"},
    {name:"subtract", label:"-", type:"operator"},
    {name:"one", label:"1", type:"digit"},
    {name:"two", label:"2", type:"digit"},
    {name:"three", label:"3", type:"digit"},
    {name:"add", label:"+", type:"operator"},
    {name:"ANS", label:"ANS", type:"digit"},
    {name:"zero", label:"0", type:"digit"},
    {name:"decimal", label:".", type:"decimal"},
    {name:"equals", label:"=", type:"nothing"},
  ];
  //given a character, like the digit 9, it will check buttonnames, see if theres an object with that label, and return that object, then it returns the type of that object
  const checkTypeOfChar=(character)=>{
    var resultTypeOfChar=buttonsNames.filter(obj=>{
      return obj.label===character;
    })
    return resultTypeOfChar[0].type;
  }
  //full string of the equation
  const [displayString, setDisplayString]=useState("");
  //holds the latest full number. ie typing out 584+306: each number is 5 then 58 then 584, resets with an operator, then 3 then 38 then 386
  const [eachNumber, setEachNumber]=useState("0");
  const [answer, setAnswer]=useState("");
  const changePreview=(label)=>{
    switch(label){
      case "AC":
        flushSync(()=>{
          setDisplayString("0");
          setEachNumber("0");
        })  
        break;
      case "ANS":
        flushSync(()=>{
          setDisplayString(answer.toString());
          setEachNumber(answer);
        })  
        break;
      case "=":
        if(checkTypeOfChar(displayString[displayString.length-1])==="operator"){
          flushSync(()=>{
            setDisplayString("");
            setEachNumber("");
          })  
        }
        else{
          setAnswer(math.evaluate(displayString));
          flushSync(()=>{
            setDisplayString(math.evaluate(displayString).toString());
            setEachNumber(math.evaluate(displayString).toString());
          })  
        }
      break;
      case ".":
        if(eachNumber===""){
          flushSync(()=>{
            setDisplayString(displayString+"0.");
            setEachNumber("0.");
          })
        }
        else if(!eachNumber.includes(".")){
          flushSync(()=>{
            setDisplayString(displayString+label);
            setEachNumber(displayString+label);
          })
        }
      break;
      case "-":
        if(checkTypeOfChar(displayString[displayString.length-1])==="digit"|checkTypeOfChar(displayString[displayString.length-1])==="decimal"|displayString.length===0){
          
          flushSync(()=>{
            setDisplayString(displayString+label);
            setEachNumber("");
          })
        }
        else if(checkTypeOfChar(displayString[displayString.length-1])==="operator"&&displayString[displayString.length-1]!=="-"){
          flushSync(()=>{
            setDisplayString(displayString+label);
            setEachNumber("");
          })
        }
        else if(displayString[displayString.length-1]==="-1"){
          if(checkTypeOfChar(displayString[displayString.length-2])!=="operator"){
            
            flushSync(()=>{
              setDisplayString(displayString+label);
              setEachNumber("");
            })
          }
        }
      break;
      case "+":
      case "/":
      case "*":
      case "%":
      case "^":
        if(displayString.length>1&&checkTypeOfChar(displayString[displayString.length-2])==="operator" && checkTypeOfChar(displayString[displayString.length-1])==="operator"){
          flushSync(()=>{
            setDisplayString(displayString.slice(0,displayString.length-2)+label);
            setEachNumber("");
          })
        }
        else if(checkTypeOfChar(displayString[displayString.length-1])==="operator"){
          flushSync(()=>{
            setDisplayString(displayString.slice(0,displayString.length-1)+label);
            setEachNumber("");
          })
        }
        else{
          flushSync(()=>{
            setDisplayString(displayString+label);
            setEachNumber("");
          })
        }
      break;
      default:
        if(displayString==="NaN"){
          flushSync(()=>{
            setDisplayString("");
            setEachNumber("");
          })  
        }
        if(eachNumber==="0"){
          if(label!=="0"){
            flushSync(()=>{
              setDisplayString(label);
              setEachNumber(label);
            })
          }
        }
        else{
          flushSync(()=>{
            setDisplayString(displayString+label);
            setEachNumber(eachNumber+label);
          })
        }
    }
  }
  return (
    <div id="container">
      <div id="header">
        <h2>calculator</h2>
        <div id="display" style={{backgroundColor:'gray', width:"200px", height:"25px", margin:"auto", textAlign:"right"}}>
          {displayString}
        </div>
      </div>
      <div id="calculatorContainer">
        {buttonsNames.map((calcButton)=>(
          <CalculatorButtons 
          name={calcButton.name} 
          key={calcButton.name}
          label={calcButton.label} 
          changePreview={changePreview}/>
        ))}
      </div>
    </div>
  );
}
export default App;
