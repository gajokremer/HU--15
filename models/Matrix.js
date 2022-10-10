function renderMatrix(rows, cols) {
  const array = [];
  for (let i = 0; i < rows; i++) {
    array.push([]);
    for (let j = 0; j < cols; j++) {
      // if (j === 0) {
      //   const hour = (i + 6).toString() + ":00";
      //   array[i].push(hour);
      // } else {
      array[i].push("---");
      // }
    }
  }
  return array;
}

export default renderMatrix;
