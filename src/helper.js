const helper = {
  convertInput: (str) => {
    const tmp = str.split(' ');
    const newArr = [];
    for (let i = 0; i < tmp.length; i += 1) {
      if (tmp[i]) newArr.push(parseInt(tmp[i]))
    }
    return newArr;
  }
}
// function convertInput(str) {
//   const tmp = str.split(' ');
//   const newArr = [];
//   for (let i = 0; i < tmp.length; i += 1) {
//     if (tmp[i]) newArr.push(parseInt(tmp[i]))
//   }
//   return newArr;
// }

export default helper;
