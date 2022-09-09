import { useState } from 'react';
import './App.css';
import Tree from './bst';
import helper from './helper';

function App() {
  const [arr, setArr] = useState('')

  function handleArray(e) {
    const convert = helper.convertInput(e.target.value);
    setArr(convert);
    console.log(Tree(arr).root);
  }

  return (
    <div className="App">
      <div className='input-container'>
        <label htmlFor='array'>
          Please enter numbers followed by spaces
        </label>
        <input type='text' id='array' onChange={handleArray}/>
        <div>{arr}</div>
      </div>
    </div>
  );
}

export default App;
