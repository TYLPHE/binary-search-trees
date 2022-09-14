import { useEffect, useState } from 'react';
import './App.css';
import Tree from './bst';
import helper from './helper';
import PrettyPrint from './PrettyPrint';

const App = () => {
  const [arr, setArr] = useState([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
  const [root, setRoot] = useState(Tree(arr).root);
  const [insert, setInsert] = useState('');
  const [del, setDel] = useState('');
  const [find, setFind] = useState('');
  const [levelOrder, setLevelOrder] = useState('');
  const [preOrder, setPreOrder] = useState('');
  const [inOrder, setInOrder] = useState('');
  const [postOrder, setPostOrder] = useState('');
  const [height, setHeight] = useState('');
  const [depth, setDepth] = useState('');
  const [isBalanced, setIsBalanced] = useState(false);

  useEffect(() => {
    setRoot({...Tree(arr).root});
  }, [arr])

  useEffect(() => {
    setLevelOrder(String(Tree(root).levelOrder()));
    setPreOrder(String(Tree(root).preorder()));
    setInOrder(String(Tree(root).inorder()));
    setPostOrder(String(Tree(root).postorder()));
    setHeight(Tree(root).height())
    setIsBalanced(Tree(root).isBalanced())
  }, [root])
  
  const handleArray = (e) =>  {
    // console.log(e.target.value)
    const convert = helper.convertInput(e.target.value);
    if (convert.length === 0) return;
    else return setArr(convert);
  }

  const changeInsert = (e) => setInsert(e.target.value);
  const handleInsert = () => {
    if (insert.length > 0) {
      setRoot({...Tree(root).insert(parseInt(insert))});
    }
    setInsert('');
  }

  const changeDel = (e) => setDel(e.target.value);
  const handleDel = () => {
    setRoot(Tree(root).delete(del));
    setDel('')
  }

  const changeFind = (e) => {
    setFind(e.target.value)
    setDepth('')
  }
  const handleFind = () => {
    const node = Tree(root).find(parseInt(find));
    setDepth(Tree(root).depth(node));
    setFind('')
  }

  const handleRebalance = () => setRoot({...Tree(root).rebalance()})

  return (
    <div className="App">
      <fieldset className='input-container'>
        <legend>Input</legend>
        <div className='field'>
          <label htmlFor='array'>Enter numbers followed by spaces</label>
          <input type='text' id='array' onChange={(e) => handleArray(e)} placeholder='1 7 4 23 8 9 4 3 5 7 9 67 6345 324'/>
        </div>

        <div className='field'>
          <label htmlFor='input'>Insert numbers (duplicates are ignored)</label>
          <div className='input-button'>
            <input type='number' id='input' onChange={(e) => changeInsert(e)} value={insert}/>
            <button onClick={() => handleInsert()}>Insert</button>
          </div>
        </div>

        <div className='field'>
          <label htmlFor='delete'>Remove number</label>
          <div className='input-button'>
            <input type='number' id='delete' onChange={(e) => changeDel(e)} value={del}/>
            <button onClick={() => handleDel()}>Delete</button>
          </div>
        </div>

        <div className='field'>
          <label htmlFor='find'>Find and view depth of number</label>
          <div className='input-button'>
            <input type='number' id='find' onChange={(e) => changeFind(e)} value={find}/>
            <button onClick={() => handleFind()}>Find</button>
            <div className='found'>{depth}</div>
          </div>
        </div>

        <div className='field'>
          <label htmlFor='rebalance'>Rebalance tree</label>
          <button id='rebalance' onClick={() => handleRebalance()}>Rebalance</button>
        </div>
      </fieldset>

      <div>
        <fieldset className='print-container'>
          <legend>Output</legend>
          <PrettyPrint root={root}/>
        </fieldset>

        <fieldset className='print-container stats'>
          <legend>Information</legend>
          <div className='field'>Height: &nbsp;{height}</div>
          <div className='field'>Balanced: &nbsp;{isBalanced}</div>
          <div className='field'>Level Order: {levelOrder}</div>
          <div className='field'>Pre Order: &nbsp;&nbsp;{preOrder}</div>
          <div className='field'>In Order: &nbsp;&nbsp;&nbsp;{inOrder}</div>
          <div className='field'>Post Order: &nbsp;{postOrder}</div>
        </fieldset>
      </div>

    </div>
  );
}

export default App;
