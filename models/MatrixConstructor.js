function constructMatrix(rows, cols) {
  const array = [];
  for (let i = 0; i < rows; i++) {
    array.push([]);
    for (let j = 0; j < cols; j++) {
      // array[i].push("---");
      const tableContent = { content: "---", row: i, col: j };
      array[i].push(tableContent);
    }
  }
  return array;
}

export default constructMatrix;
