# Binary Search Trees
Building a balanced binary search tree (BST)
![A screenshot of the Binary Search Trees assignment](https://github.com/TYLPHE/binary-search-trees/blob/main/readme-assets/bst.jpeg)
## Links
- [Try Binary Search Trees here](https://TYLPHE.github.io/binary-search-trees/)
- [Link to assignment](https://www.theodinproject.com/lessons/javascript-binary-search-trees)

## Summary
All of my binary search tree functions can be found in my `bst.js` file. This project contains 2 factory functions, `Node` and `Tree`:
```javascript
function Node(data, left = null, right = null) {
  return {
    data: data,
    left: left,
    right: right,
  }
}

function Tree(arr) {
  // Remove duplicates and sort array
  const uniqueArr = [...new Set(arrObj.sort((a, b) => a - b))];
  return {
    root: buildTree(uniqueArr),

    insert(value, root = this.root) {
      // code
    },

    delete(value, root = this.root) {
      // code
    },

    find(value, root = this.root) {
      // code
    },

    levelOrder(arr = [], queue = [], root = this.root) {
      // code
    },

    inorder(arr = [], root = this.root) {
      // code
    },

    preorder(arr = [], root = this.root) {
      // code
    },

    postorder(arr = [], root = this.root) {
      // code
    },

    height(root = this.root) {
      // code
    },

    depth(node, root = this.root, depth = 0) {
      // code
    },

    isBalanced(root = this.root) {
      // code
    },

    rebalance(root = this.root) {
      // code
    },
  }
}
```

The `buildTree(arr)` function takes the sorted array and returns nodes with the left and right pointers assigned.

The links provided on The Odin Project's assignment page were very helpful in helping me solve a lot of these functions.

After finshing all functions, I decided to mix React with the very helpful `prettyPrint` function provided on the assignment page. My goal was to practice more React and work with binary search trees a little more to try understand it better.

## Notes
### Remove duplicates from array by using Set()
This article was very helpful for [removing duplicates from an array](https://www.javascripttutorial.net/array/javascript-remove-duplicates-from-array/) by using the Set function.

In my example, I accept an array(`arr`), sort it and remove all the duplicates in a single line of code:
```javascript
[...new Set(arr.sort((a, b) => a - b))]
```

### States that are objects need to be updated differently
I leared that when I assigned a node object to a React hook, [my useEffect function did not update](https://stackoverflow.com/questions/66297736/useeffect-not-triggering-when-object-property-in-dependence-array). Below I have my hook designed to take an object:
```javascript
const [root, setRoot] = useState(Tree(arr).root);
```

I have a useEffect() that updates whenever root updates:
```javascript
useEffect(() => {
  setLevelOrder(String(Tree(root).levelOrder()));
  setPreOrder(String(Tree(root).preorder()));
  setInOrder(String(Tree(root).inorder()));
  setPostOrder(String(Tree(root).postorder()));
  setHeight(Tree(root).height())
  setIsBalanced(Tree(root).isBalanced())
}, [root]);
```

I learned that I need to create a new object and then assign it to the hook.
Instead of doing something like this:
```javascript
root = useState(Tree(arr).root);
```

I do something like this and my useEffect() triggers:
```javascript
root = useState({Tree(arr).root});
```