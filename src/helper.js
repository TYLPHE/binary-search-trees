const helper = {
  convertInput(str) {
    const tmp = str.split(' ');
    const newArr = [];
    for (let i = 0; i < tmp.length; i += 1) {
      if (tmp[i]) newArr.push(parseInt(tmp[i]));
    }
    return newArr;
  },

  prettyPrint(node, prefix = '', isLeft = true) {
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  },
}

export default helper;
