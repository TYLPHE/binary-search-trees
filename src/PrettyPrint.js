
function PrettyPrint(props) {
  function print(node = props.root, text = '', isLeft = true, str = []) {
    if (node.right !== null) {
      print(node.right, `${text}${isLeft ? '│   ' : '    '}`, false, str);
    }

    str.push(`${text}${isLeft ? '└── ' : '┌── '}${node.data}`);

    if (node.left !== null) {
      print(node.left, `${text}${isLeft ? '    ' : '│   '}`, true, str);
    }
    return str;
  }

  function PrintLines() {
    let arr = print();
    let returnArr = [];
    for (let i = 0; i < arr.length; i += 1) {
      returnArr.push(<div key={i}>{arr[i]}</div>);
    }
    return <>{returnArr}</>;
  }
  return (
    <div className='print'>
      <PrintLines />
    </div>
  )
}

export default PrettyPrint;
