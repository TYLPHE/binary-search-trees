import { useEffect, useState } from 'react';
import './App.css';
import Tree from './bst';
import helper from './helper';
import PrettyPrint from './PrettyPrint';

function App() {
  const [arr, setArr] = useState([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
  const [root, setRoot] = useState(Tree(arr).root);
  const [insert, setInsert] = useState('');

  useEffect(() => {
    setRoot(Tree(arr).root);
  }, [arr])
  
  function handleArray(e) {
    const convert = helper.convertInput(e.target.value);
    setArr(convert);
  }

  function changeInsert(e) {
    setInsert(e.target.value);
  }

  function handleInsert() {
    setRoot(Tree(arr).insert(insert));
    setInsert('');
  }
  return (
    <div className="App">
      <fieldset className='print-container'>
        <legend>Output</legend>
        <PrettyPrint root={root}/>
      </fieldset>

      <fieldset className='input-container'>
        <legend>Input</legend>
        <div className='input-section'>
          <label htmlFor='array'>Enter numbers followed by spaces</label>
          <input type='text' id='array' onChange={(e) => handleArray(e)} placeholder='1 7 4 23 8 9 4 3 5 7 9 67 6345 324'/>
        </div>

        <div className='input-section'>
          <label htmlFor='input'>Insert numbers into tree: </label>
          <div>
            <input type='number' id='input' onChange={(e) => changeInsert(e)} value={insert}/>
            <button onClick={() => handleInsert()}>Insert</button>
          </div>
        </div>
      </fieldset>


    </div>
  );
}

export default App;
