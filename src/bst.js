function Node(data, left = null, right = null) {
  return {
    data: data,
    left: left,
    right: right,
  }
}

// buildTree returns root node at level 0
function buildTree(arr, start = 0, end = arr.length - 1) {
  if (start > end) return null;
  
  const mid = parseInt((start + end) / 2);
  const root = Node(arr[mid]);
  
  root.left = buildTree(arr, start, mid - 1);
  root.right = buildTree(arr, mid + 1, end);
  
  return root;
}

function Tree(arr) {
  // Remove duplicates and sort array
  const uniqueArr = [...new Set(arr.sort((a, b) => a - b))];

  return {
    root: buildTree(uniqueArr),

    insert(value, root = this.root) {
      if (root === null) {
        root = Node(value);
        return root;
      }

      if (value < root.data) {
        root.left = this.insert(value, root.left);
      } else if (value > root.data) {
        root.right = this.insert(value, root.right);
      }

      return root;
    },

    delete(value, root = this.root) {
      // Base case
      if (root === null) {
        return root;
      }

      // Traverse down the tree
      if (value < root.data) {
        root.left = this.delete(value, root.left);
      } else if (value > root.data) {
        root.right = this.delete(value, root.right);
      } 

      // Value matches -> delete node and update pointers
      else {
        // option 1: root(child) has only one child
        if (root.left === null) {
          // return the child's right so new parent can point to it
          return root.right;
        } else if (root.right === null) {
          // return child's left so new parent can point to it
          return root.left;
        }
        // option 2: Node has two children
        else {
          // Replace node with next smallest value
          const minData = function findNextSmallestRightData(root) {
            let min = root.data;
            let newRoot = root;

            // Search for a left node with no left children. 
            while (newRoot.left !== null) {
              min = root.left.data;
              newRoot = root.left;
            }

            return min;
          }

          root.data = minData(root.right);

          // Delete the copied node from minData()
          root.right = this.delete(root.data, root.right)
        }
      }

      return root;
    },

    find(value, root = this.root) {
      // Return root if null or matches value
      if (root === null || root.data === value) {
        return root;
      }

      // Access root's children if value not found; 
      if (value < root.data) {
        return this.find(value, root.left);
      }
      return this.find(value, root.right); 
    },

    levelOrder(arr = [], queue = [], root = this.root) {
      if (root === null) return;
      // Visit the root
      arr.push(root.data);

      // Traverse to left and right children -> add to queue
      queue.push(root.left);
      queue.push(root.right);

      // Move to next level
      while (queue.length) {
        const level = queue[0];
        queue.shift();
        this.levelOrder(arr, queue, level)
      }

      return arr;
    },

    inorder(arr = [], root = this.root) {
      if (root === null) return;
      
      // Traverse left subtree
      if (root.left) this.inorder(arr, root.left);
      
      // Visit the root
      arr.push(root.data);
      
      // Traverse right subtree
      if (root.right) this.inorder(arr, root.right);
     
      return arr;
    },

    preorder(arr = [], root = this.root) {
      if (root === null) return;
      
      // Visit the root
      arr.push(root.data);
      
      // Traverse the left subtree
      if (root.left) this.preorder(arr, root.left);
      
      // Traverse the right subTree
      if (root.right) this.preorder(arr, root.right);
      
      return arr;
    },

    postorder(arr = [], root = this.root) {
      if (root === null) return;

      // Traverse left subtree
      if (root.left) this.postorder(arr, root.left);
      
      // Traverse right subtree
      if (root.right) this.postorder(arr, root.right);
      
      // Visit the root
      arr.push(root.data);

      return arr;
    },

    height(root = this.root) {
      if (root === null) return 0;

      let lHeight = this.height(root.left);
      let rHeight = this.height(root.right);

      if (lHeight > rHeight) {
        return lHeight + 1;
      } else {
        return rHeight + 1;
      }
    },

    depth(node, root = this.root, depth = 0) {
      if (root === null) return;
      if (node === root) return depth;
      if (node.data < root.data) {
        return this.depth(node, root.left, depth += 1);
      } else {
        return this.depth(node, root.right, depth += 1);
      }
    },

    isBalanced(root = this.root) {
      const lHeight = this.height(root.left);
      const rHeight = this.height(root.right);
      const diff = Math.abs(lHeight - rHeight);
      return diff < 2 ? true : false;
    },

    rebalance(root = this.root) {
      let arr = this.levelOrder([], [], root);
      arr.sort((a, b) => a - b);
      return this.root = buildTree(arr);
    },
  }
}

// const prettyPrint = (node, prefix = '', isLeft = true) => {
//   if (node.right !== null) {
//     prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
//   }
//   console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
//   if (node.left !== null) {
//     prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
//   }
// }

// let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// const tree = Tree(arr);
// prettyPrint(tree.root);
// console.log('find: ', tree.find(1))
// console.log('insert: ', tree.insert(999));
// console.log('insert: ', tree.insert(998));
// console.log('insert: ', tree.insert(997));
// prettyPrint(tree.root);
// console.log('delete: ', tree.delete(8));
// prettyPrint(tree.root);
// console.log('isBalanced: ', tree.isBalanced());
// console.log('rebalance: ', tree.rebalance());
// prettyPrint(tree.root);
// console.log('depth: ', tree.depth(tree.find(999)));
// console.log('height: ', tree.height());
// console.log('breadth: ', tree.levelOrder());
// console.log('preorder: ', tree.preorder());
// console.log('inorder: ', tree.inorder());
// console.log('postorder: ', tree.postorder());

// let testArr = [3,5,9];
// const testTree = Tree(testArr);
// testTree.insert(1);
// testTree.insert(4);
// prettyPrint(testTree.root);
// console.log('inorder: ', testTree.inorder());
// console.log('preorder: ', testTree.preorder())
// console.log('postorer: ', testTree.postorder());

export default Tree;
