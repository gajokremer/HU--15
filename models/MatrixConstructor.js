function constructMatrix(rows, cols) {
  const array = [];
  for (let i = 0; i < rows; i++) {
    array.push([]);
    for (let j = 0; j < cols; j++) {
      array[i].push("---");
    }
  }
  return array;
}

export default constructMatrix;
