import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import './App.css';
import { IAction } from './store/actions';
import { incrementAsync } from './store/thunks/incrementThunk';

function App() {

  const dispatch: Dispatch<any> = useDispatch(); 

  let [number, setNumber] = useState<number>(0);


  let currentSum: number = useSelector((action: IAction) => {
    console.log(action);
    return action.value as number
  } );
  console.log("currentSum", currentSum);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    let value: number = parseInt(event.target.value);
    setNumber(value)
  };

  const onIncrement = (): void => {
    console.log("on increment");
    let action = incrementAsync(number);
    dispatch(action);
  }

  return (
    <div className="App">
      <input type="text" value={number} onChange={ (event) => onChange(event)}/>
      <button onClick={onIncrement}>Increment</button>
      <p><b>Current sum:</b> {currentSum} </p>
    </div>
  );
}

export default App;
