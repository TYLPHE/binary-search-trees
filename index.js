function Node(data, left = null, right = null) {
  return {
    data: data,
    left: left,
    right: right,
  }
}

function Tree(arr) {
  // Remove duplicates and sort array
  const uniqueArr = [...new Set(arr.sort((a, b) => a - b))];
  return {
    root: buildTree(uniqueArr),
    insert(value, root = this.root) {
      if (root === null) {
        console.log('insert-root')
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
        // root(child) has only one child
        if (root.left === null) {
          // return the child's right so new parent can point to it
          return root.right;
        } else if (root.right === null) {
          // return child's left so new parent can point to it
          return root.left;
        } 
        // Node has two children
        else {
          const minData = function findNextSmallestNodeToReplaceIt(node) {
            let min = node.data;
            let newRoot = node;
            // Search for a left node with no left children. 
            while (newRoot.left !== null) {
              min = node.left.data;
              newRoot = node.left;
            }
            return min;
          }

          // Replace node with next smallest value. 
          // Should still be bigger than root.left
          root.data = minData(root.right);

          // delete the unnecessary extra node from minData()
          root.right = this.delete(root.right, root.data)
        }

        return root;

      }


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

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = Tree(arr);
prettyPrint(tree.root);
console.log('find: ', tree.find(1))
console.log('insert: ', tree.insert(999));
prettyPrint(tree.root);
console.log('delete: ', tree.delete(8));
prettyPrint(tree.root);